
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await api.submitContact({
      ...formData,
      timestamp: new Date().toISOString()
    });
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
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
                  <p className="text-text-dark/60 italic">Boudha, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Call Us</h4>
                  <p className="text-text-dark/60">+977-1-4XXXXXX</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-green shadow-sm shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">Email Support</h4>
                  <p className="text-text-dark/60">info@himalayanherbs.com</p>
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
                <h3 className="text-2xl font-bold text-text-dark mb-4">Message Sent!</h3>
                <p className="text-text-dark/60 mb-8">Thank you for reaching out. We will get back to you within 24-48 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="bg-primary-green text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-green/90"
                >
                  Send another message
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
