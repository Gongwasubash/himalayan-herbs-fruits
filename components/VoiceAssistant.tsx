
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Modality, Type, FunctionDeclaration, LiveServerMessage } from '@google/genai';
import { MicOff, X, Leaf, Loader2, MessageSquareQuote } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { api } from '../services/api';

// Audio Encoding/Decoding Utilities
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Use ref for latest cart function to avoid stale closures
  const cartRef = useRef({ addToCart });
  cartRef.current = { addToCart };
  
  const audioContexts = useRef<{ input?: AudioContext; output?: AudioContext }>({});
  const nextStartTime = useRef<number>(0);
  const sources = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const activeSession = useRef<any>(null);

  const stopAssistant = () => {
    activeSession.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sources.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sources.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    nextStartTime.current = 0;
  };

  const toolDeclarations: FunctionDeclaration[] = [
    {
      name: 'navigate_to',
      parameters: {
        type: Type.OBJECT,
        description: 'Navigate the user to specific parts of the Nepali store.',
        properties: {
          page: { type: Type.STRING, description: 'Target: home, products, about, cart, contact' },
          category: { type: Type.STRING, description: 'Filter: Jadibuti or Local Fruits' },
          search_query: { type: Type.STRING, description: 'Product name in English or Nepali' }
        },
        required: ['page']
      }
    },
    {
      name: 'add_product_to_cart',
      parameters: {
        type: Type.OBJECT,
        description: 'Add a high-quality Himalayan product to the cart.',
        properties: {
          product_name: { type: Type.STRING, description: 'Name of the product (e.g., Timur, Apple)' },
          quantity: { type: Type.NUMBER, description: 'Quantity (defaults to 1)' }
        },
        required: ['product_name']
      }
    }
  ];

  const startAssistant = async () => {
    setError(null);
    setIsConnecting(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const products = await api.getProducts();

      // Setup Audio Contexts
      if (!audioContexts.current.input || audioContexts.current.input.state === 'closed') {
        audioContexts.current.input = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!audioContexts.current.output || audioContexts.current.output.state === 'closed') {
        audioContexts.current.output = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      await audioContexts.current.input.resume();
      await audioContexts.current.output.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: toolDeclarations }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
          systemInstruction: `तपाईं 'Himalayan Herbs & Fruits' को डिजिटल साथी (Himalayan Sathi) हुनुहुन्छ। 
          
          Persona & Culture:
          - Always start with a warm "Namaste". 
          - Be extremely polite, use "Hajur", "Dhanyabaad", and respect the Nepali value "Atithi Devo Bhava" (Guest is God).
          - You are an expert in local Jadibuti (Timur, Jatamasi) and organic Fruits from Jumla/Mustang.
          
          Technical Duties:
          - Inventory: ${JSON.stringify(products.map(p => ({ name: p.name, nepali: p.nepaliName, price: p.price, benefits: p.benefits })))}
          - Commands:
            1. If they want to see products or categories, use 'navigate_to'.
            2. If they want to buy, use 'add_product_to_cart'.
            3. Always verbally confirm the action after calling the tool (e.g., "Hajur, I've added Timur to your cart!").
          - Language: You understand both Nepali and English perfectly.
          
          Respond naturally, keeping responses short enough for a voice conversation.`,
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            
            const source = audioContexts.current.input!.createMediaStreamSource(stream);
            const scriptProcessor = audioContexts.current.input!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encodeBase64(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              // CRITICAL: Solely rely on sessionPromise resolves
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {
                // Ignore if session failed
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContexts.current.input!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Tool Calls
            if (message.toolCall) {
              const functionResponses = [];
              for (const fc of message.toolCall.functionCalls) {
                let result = "Action performed successfully.";
                if (fc.name === 'navigate_to') {
                  const { page, category, search_query } = fc.args as any;
                  let path = '/';
                  if (page === 'products') path = '/products';
                  else if (page === 'cart') path = '/cart';
                  else if (page === 'contact') path = '/contact';
                  
                  if (category) path += `?category=${encodeURIComponent(category)}`;
                  else if (search_query) path += `?search=${encodeURIComponent(search_query)}`;
                  
                  navigate(path);
                  result = `Navigation successful. User is now viewing ${page}.`;
                } else if (fc.name === 'add_product_to_cart') {
                  const { product_name, quantity = 1 } = fc.args as any;
                  const item = products.find(p => 
                    p.name.toLowerCase().includes(product_name.toLowerCase()) || 
                    p.nepaliName.includes(product_name)
                  );
                  if (item) {
                    cartRef.current.addToCart(item, Number(quantity));
                    result = `Added ${quantity} units of ${item.name} to the cart. Price: Rs. ${item.price}.`;
                  } else {
                    result = `Product '${product_name}' not found.`;
                  }
                }
                
                functionResponses.push({
                  id: fc.id,
                  name: fc.name,
                  response: { result: result }
                });
              }

              if (functionResponses.length > 0) {
                sessionPromise.then(session => {
                  session.sendToolResponse({ functionResponses });
                });
              }
            }

            // Handle Audio Playback
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContexts.current.output) {
              const outCtx = audioContexts.current.output;
              nextStartTime.current = Math.max(nextStartTime.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decodeBase64(audioData), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outCtx.destination);
              source.addEventListener('ended', () => {
                sources.current.delete(source);
                if (sources.current.size === 0) setIsSpeaking(false);
              });
              setIsSpeaking(true);
              source.start(nextStartTime.current);
              nextStartTime.current += audioBuffer.duration;
              sources.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sources.current.forEach(s => { try { s.stop(); } catch (e) {} });
              sources.current.clear();
              nextStartTime.current = 0;
              setIsSpeaking(false);
            }
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setError("Network error. Please try again.");
            stopAssistant();
          },
          onclose: () => {
            stopAssistant();
          }
        }
      });
      
      activeSession.current = await sessionPromise;
    } catch (err) {
      console.error("Assistant Start Error:", err);
      setError("Connection failed. Check your microphone or network.");
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {isActive && (
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 w-80 border-t-8 border-primary-green overflow-hidden animate-in slide-in-from-bottom-6 duration-500 relative">
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
             <div className="grid grid-cols-4 gap-1">
                {[...Array(20)].map((_, i) => <div key={i} className="w-10 h-10 bg-red-500 rotate-45" />)}
             </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse shadow-sm shadow-red-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dark/40">Himalayan Sathi</span>
                <span className="text-xs font-bold text-primary-green">हिमाली साथी • LIVE</span>
              </div>
            </div>
            <button onClick={stopAssistant} className="p-2 hover:bg-neutral-bg rounded-full transition-colors">
              <X size={20} className="text-text-dark/50" />
            </button>
          </div>

          <div className="flex flex-col items-center py-6">
            <div className={`w-28 h-28 rounded-full bg-accent-cream flex items-center justify-center relative transition-all duration-500 shadow-inner ${isSpeaking ? 'scale-110 shadow-primary-green/20' : 'scale-100'}`}>
              <div className="flex gap-1.5 items-end h-10">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 bg-primary-green rounded-full transition-all duration-300 ${isSpeaking ? 'animate-bounce' : 'h-2 opacity-30'}`} 
                    style={{ animationDelay: `${i * 0.1}s`, height: isSpeaking ? `${20 + Math.random() * 30}px` : '8px' }} 
                  />
                ))}
              </div>
              {isSpeaking && <div className="absolute inset-0 rounded-full border-4 border-primary-green/20 animate-ping" />}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-text-dark mb-1">
                {isSpeaking ? "Namaste! I'm speaking..." : "Listening..."}
              </p>
              <p className="text-[10px] font-bold text-earth-brown uppercase tracking-widest opacity-60">
                {isSpeaking ? "नमस्ते! सुन्दै हुनुहुन्छ?" : "हजुर! भन्नुहोस्..."}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-bg flex flex-col gap-3">
             <div className="flex items-center gap-2 text-[10px] text-text-dark/40 bg-neutral-bg/50 px-3 py-2 rounded-xl italic">
                <MessageSquareQuote size={12} />
                "Show me Apples" or "जुम्लाको स्याउ देखाउनुहोस्"
             </div>
             <button 
              onClick={stopAssistant} 
              className="w-full bg-red-50 text-red-600 py-4 rounded-[1.5rem] font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MicOff size={18} /> End Session (बन्द गर्नुहोस्)
            </button>
          </div>
        </div>
      )}

      {!isActive && (
        <div className="group flex items-center gap-4">
          {error && (
            <div className="bg-red-600 text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-2xl animate-in slide-in-from-right-4">
              {error}
            </div>
          )}
          <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border border-primary-green/10 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
             <div className="flex flex-col items-end">
               <span className="text-xs font-bold text-primary-green">Ask our Himalayan Sathi</span>
               <span className="text-[9px] font-bold text-earth-brown/60 uppercase tracking-widest">नमस्ते! कुरा गरौँ?</span>
             </div>
          </div>
          <button 
            onClick={startAssistant} 
            disabled={isConnecting} 
            className="w-20 h-20 bg-primary-green text-white rounded-full flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(29,124,75,0.3)] hover:scale-110 active:scale-90 transition-all disabled:opacity-50 relative overflow-hidden group/btn"
          >
            {isConnecting ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <>
                <Leaf size={32} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
                <span className="text-[8px] font-black uppercase tracking-tighter mt-1 opacity-60">Voice</span>
              </>
            )}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
