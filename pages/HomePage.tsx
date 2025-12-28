
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Apple, Star } from 'lucide-react';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { TESTIMONIALS } from '../constants';
import { useCart } from '../store/cartStore';
import HeroSlider from '../components/HeroSlider';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts().then(products => {
      setFeaturedProducts(products.slice(0, 4));
    });
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-text-dark mb-4">Our Categories</h3>
          <div className="w-20 h-1 bg-primary-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/products?category=Jadibuti" className="group relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <img src="https://himalayan-masters.com/wp-content/uploads/2025/05/Top-Medicinal-Plants-found-in-Nepal.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Herbs" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <Leaf className="text-primary-green mb-4" size={40} />
              <h4 className="text-3xl font-bold text-white mb-2">Jadibuti / Herbs</h4>
              <p className="text-white/80">Traditional medicinal herbs from the high Himalayas.</p>
            </div>
          </Link>

          <Link to="/products?category=Local Fruits" className="group relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <img src="https://hips.hearstapps.com/hmg-prod/images/apples-at-farmers-market-royalty-free-image-1627321463.jpg?crop=1.00xw:0.631xh;0.00160xw,0.206xh&resize=1400:*" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fruits" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
              <Apple className="text-primary-green mb-4" size={40} />
              <h4 className="text-3xl font-bold text-white mb-2">Local Fruits</h4>
              <p className="text-white/80">Sweet, sun-ripened organic fruits from Nepal's hills.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-accent-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-bold text-text-dark mb-2">Featured Products</h3>
              <p className="text-earth-brown font-medium">Hand-picked selections for your wellness.</p>
            </div>
            <Link to="/products" className="text-primary-green font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-neutral-bg group">
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {product.category}
                  </div>
                </Link>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-text-dark mb-1 line-clamp-1">{product.name}</h4>
                  <p className="text-primary-green font-bold text-lg mb-4">Rs. {product.price}</p>
                  <button 
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-3 bg-neutral-bg text-primary-green font-bold rounded-xl hover:bg-primary-green hover:text-white transition-colors border border-primary-green/10"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-text-dark mb-4">What Our Customers Say</h3>
          <div className="w-20 h-1 bg-primary-green mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-bg relative">
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-text-dark/80 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <h5 className="font-bold text-text-dark">{t.name}</h5>
                <p className="text-sm text-earth-brown">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
