
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const TestimonialsPage: React.FC = () => {
  return (
    <div className="bg-accent-cream min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <Quote size={48} className="mx-auto text-primary-green/30 mb-6" />
          <h1 className="text-4xl font-bold text-text-dark mb-4">Customer Stories</h1>
          <p className="text-lg text-earth-brown">Real experiences from our community of Himalayan enthusiasts.</p>
        </div>

        <div className="space-y-8">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={t.id} 
              className={`bg-white p-10 rounded-[3rem] shadow-sm border border-primary-green/5 animate-in slide-in-from-bottom-8 duration-700`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <p className="text-2xl text-text-dark leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center text-primary-green font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-dark">{t.name}</h4>
                  <p className="text-primary-green text-sm font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center p-12 bg-primary-green rounded-[3rem] text-white">
          <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
          <p className="mb-8 text-white/80">Have you tried our products? We would love to hear from you!</p>
          <button className="bg-white text-primary-green font-bold px-8 py-4 rounded-full hover:bg-neutral-bg transition-colors shadow-lg">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
