
import React from 'react';
import { Leaf, Users, Shield, Sprout } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="bg-primary-green text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Himalayan Journey</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Preserving the ancient wisdom of Himalayan herbs and supporting the hardworking farmers of Nepal.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-text-dark mb-6">Our Mission</h2>
            <p className="text-lg text-text-dark/70 leading-relaxed mb-6">
              Himalayan Herbs & Fruits was founded with a simple yet powerful goal: to connect the incredible biodiversity of the Himalayas with the rest of the world. 
            </p>
            <p className="text-lg text-text-dark/70 leading-relaxed mb-8">
              We specialize in sourcing high-quality Jadibuti (medicinal herbs) and organic fruits directly from local farmers in Jumla, Mustang, Dhankuta, and beyond. By cutting out middlemen, we ensure that farmers get fair prices and you get the freshest products.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-6 bg-accent-cream rounded-3xl text-center">
                <Sprout size={32} className="text-primary-green mb-3" />
                <span className="font-bold">100% Organic</span>
              </div>
              <div className="flex flex-col items-center p-6 bg-accent-cream rounded-3xl text-center">
                <Users size={32} className="text-primary-green mb-3" />
                <span className="font-bold">Fair Trade</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-green/10 rounded-[4rem] rotate-3"></div>
            <img 
              src="https://cdn.prod.website-files.com/5f1618726b3fb3f4cbb10bd2/6249f9760013f780a12a614d_vision%20mission-p-1080.jpeg" 
              className="relative w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
              alt="Farmers working"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-neutral-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1 bg-primary-green mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                <Shield size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">Guaranteed Purity</h4>
              <p className="text-text-dark/60 leading-relaxed">Our herbs are tested for purity and potency, ensuring you receive the true healing power of nature.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                <Leaf size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">Sustainable Sourcing</h4>
              <p className="text-text-dark/60 leading-relaxed">We practice sustainable wild harvesting and support biodiversity conservation in the mountains.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-primary-green group-hover:bg-primary-green group-hover:text-white transition-all">
                <Users size={32} />
              </div>
              <h4 className="text-xl font-bold mb-4">Empowering Communities</h4>
              <p className="text-text-dark/60 leading-relaxed">Every purchase directly impacts the lives of Nepali highland farming families and their children's education.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
