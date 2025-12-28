
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/api';
import { useCart } from '../store/cartStore';
import { ArrowLeft, ShoppingBag, Leaf, Heart, ShieldCheck, Truck } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.getProductById(id).then(data => {
        if (data) setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-green"></div></div>;
  if (!product) return <div className="p-20 text-center">Product not found. <Link to="/products" className="text-primary-green font-bold">Back to shop</Link></div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Simple notification logic could go here
    navigate('/cart');
  };

  return (
    <div className="bg-neutral-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-primary-green font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Products
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 animate-in fade-in zoom-in-95 duration-500">
          {/* Image Section */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="bg-primary-green text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                {product.category}
              </span>
              <span className="bg-earth-brown text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                100% Organic
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-16 flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-text-dark mb-2">{product.name}</h1>
              <p className="text-2xl text-primary-green font-bold mb-4">{product.nepaliName}</p>
              <p className="text-3xl font-extrabold text-earth-brown">Rs. {product.price}</p>
            </div>

            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-green/60 mb-2">Description</h3>
                <p className="text-text-dark/80 leading-relaxed text-lg">{product.description}</p>
              </div>

              <div className="bg-neutral-bg/50 p-6 rounded-2xl border border-primary-green/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-green/60 mb-3 flex items-center gap-2">
                  <Heart size={16} className="text-primary-green" /> Key Benefits
                </h3>
                <p className="text-text-dark font-medium">{product.benefits}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center border-2 border-primary-green/20 rounded-2xl p-1 bg-neutral-bg/30">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-white rounded-xl transition-colors"
                  >-</button>
                  <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center font-bold text-2xl hover:bg-white rounded-xl transition-colors"
                  >+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-3 bg-primary-green text-white py-4 px-8 rounded-2xl font-bold text-xl hover:bg-primary-green/90 shadow-xl shadow-primary-green/20 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <ShoppingBag size={24} /> Add to Cart
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-neutral-bg">
                <div className="flex items-center gap-3 text-sm text-text-dark/70 font-medium">
                  <ShieldCheck className="text-primary-green" size={20} />
                  Quality Assured
                </div>
                <div className="flex items-center gap-3 text-sm text-text-dark/70 font-medium">
                  <Truck className="text-primary-green" size={20} />
                  Delivery Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
