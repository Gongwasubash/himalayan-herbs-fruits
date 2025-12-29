
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Apple, Star } from 'lucide-react';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { sheetsService } from '../services/sheets';
import { TESTIMONIALS } from '../constants';
import { useCart } from '../store/cartStore';
import HeroSlider from '../components/HeroSlider';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts().then(products => {
      setFeaturedProducts(products.slice(0, 4));
    });
    sheetsService.getCategoryImages().then(setCategoryImages);
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.values(Category).map((category) => {
            const categoryImage = categoryImages[category] || 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400';
            
            return (
              <Link 
                key={category} 
                to={`/products?category=${encodeURIComponent(category)}`} 
                className="group relative h-32 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={categoryImage} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h4 className="font-bold text-white text-sm mb-1">{category}</h4>
                  <p className="text-white/80 text-xs">Explore products</p>
                </div>
              </Link>
            );
          })}
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
