
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../store/cartStore';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-neutral-bg min-h-screen py-24 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-lg w-full mx-4">
          <div className="w-24 h-24 bg-neutral-bg rounded-full flex items-center justify-center mx-auto mb-8 text-primary-green/30">
            <ShoppingBag size={48} />
          </div>
          <h2 className="text-3xl font-bold text-text-dark mb-4">Your cart is empty</h2>
          <p className="text-text-dark/60 mb-8">Looks like you haven't added any Himalayan goodness to your cart yet.</p>
          <Link to="/products" className="inline-block bg-primary-green text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-green/90 shadow-lg shadow-primary-green/20">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text-dark mb-12 flex items-center gap-4">
          Shopping Cart <span className="text-lg font-medium text-earth-brown bg-white px-3 py-1 rounded-full border border-primary-green/10">{totalItems} items</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white p-6 rounded-3xl shadow-sm border border-primary-green/5 flex flex-col sm:flex-row gap-6 animate-in slide-in-from-left-4 duration-500">
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-text-dark mb-1">{item.product.name}</h3>
                      <p className="text-primary-green font-medium text-sm">{item.product.nepaliName}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 bg-neutral-bg/50 rounded-xl p-1 border border-primary-green/10">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary-green transition-colors font-bold"
                      ><Minus size={14} /></button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-primary-green transition-colors font-bold"
                      ><Plus size={14} /></button>
                    </div>
                    <span className="text-xl font-bold text-earth-brown">Rs. {item.product.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-primary-green/5 sticky top-28">
              <h2 className="text-2xl font-bold text-text-dark mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-dark/70">
                  <span>Subtotal</span>
                  <span className="font-bold">Rs. {totalPrice}</span>
                </div>
                <div className="flex justify-between text-text-dark/70">
                  <span>Shipping</span>
                  <span className="text-primary-green font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-neutral-bg flex justify-between items-center">
                  <span className="text-xl font-bold text-text-dark">Total</span>
                  <span className="text-3xl font-extrabold text-primary-green">Rs. {totalPrice}</span>
                </div>
              </div>

              <Link to="/checkout" className="w-full bg-primary-green text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary-green/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-green/20 mb-4">
                Proceed to Checkout <ArrowRight size={24} />
              </Link>
              
              <p className="text-center text-sm text-text-dark/50">
                Prices inclusive of all local taxes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
