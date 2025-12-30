
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { sheetsService } from '../services/sheets';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Save to Google Sheets
      const saved = await sheetsService.saveMessage(formData);
      
      if (saved) {
        setStatus('success');
        setFormData({ name: '', email: '', address: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-neutral-bg min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="animate-in slide-in-from-left-8 duration-700">
            <h1 className="text-5xl font-bold text-text-dark mb-6">Get in Touch</h1>
            <p className="text-lg text-text-dark/70 mb-12 leading-relaxed">
              Have questions about our herbs or seasonal fruit availability? Our team is here to help you choose the best products for your health and lifestyle.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Our Location</h4>
                  <p className="text-text-dark/60 italic">Banglamukhi, Lalitpur, Nepal</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Call Us</h4>
                  <p className="text-text-dark/60">📞 9840564096</p>
                  <p className="text-text-dark/60">📞 986-6556633</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">WhatsApp</h4>
                  <a 
                    href="https://wa.me/9779840564096" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-green hover:text-primary-green/80 font-medium flex items-center gap-2 mb-2"
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-4 h-4" />
                    9840564096
                  </a>
                  <a 
                    href="https://wa.me/97798665566633" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-green hover:text-primary-green/80 font-medium flex items-center gap-2"
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-4 h-4" />
                    986-6556633
                  </a>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Email Support</h4>
                  <p className="text-text-dark/60">subashgongwanepal@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-primary-green/5 animate-in slide-in-from-right-8 duration-700">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-text-dark mb-4">Message Received!</h3>
                <p className="text-text-dark/60 mb-8">Thank you for your message. We have received your inquiry and will get back to you soon.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-primary-green text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-green/90"
                >
                  Send another message
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <h3 className="text-2xl font-bold text-text-dark mb-4">Send Failed</h3>
                <p className="text-text-dark/60 mb-8">Please check your Google Sheets API configuration or contact us directly at subashgongwanepal@gmail.com</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-primary-green text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-green/90"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Your Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ram Shrestha"
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ram@example.com"
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Address</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Kathmandu, Nepal"
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you?"
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-primary-green text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
