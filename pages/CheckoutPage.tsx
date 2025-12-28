
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../store/cartStore';

const CheckoutPage: React.FC = () => {
  const { clearCart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="bg-neutral-bg min-h-screen py-24 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 lg:p-20 rounded-[4rem] shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-primary-green/10 text-primary-green rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={64} />
          </div>
          <h1 className="text-4xl font-extrabold text-text-dark mb-6 tracking-tight">Order Placed Successfully!</h1>
          <p className="text-xl text-text-dark/60 mb-12 leading-relaxed">
            Thank you for choosing <span className="text-primary-green font-bold">Himalayan Herbs & Fruits</span>. Your order is being processed and will be delivered shortly.
          </p>
          <Link to="/products" className="inline-block bg-primary-green text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-primary-green/90 shadow-xl shadow-primary-green/20 transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-bg min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-dark mb-12">Checkout</h1>
        
        <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-xl border border-primary-green/5">
          <div className="mb-12 pb-8 border-b border-neutral-bg">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-primary-green bg-primary-green/5 p-6 rounded-3xl cursor-pointer">
                <div className="flex justify-between mb-4">
                  <div className="w-6 h-6 rounded-full border-4 border-primary-green flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                  </div>
                  <span className="font-bold text-primary-green">COD</span>
                </div>
                <p className="font-bold">Cash on Delivery</p>
                <p className="text-sm text-text-dark/50">Pay when your order arrives</p>
              </div>
              <div className="border border-neutral-bg p-6 rounded-3xl opacity-50 cursor-not-allowed">
                <div className="flex justify-between mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-neutral-bg"></div>
                  <span className="font-bold">eSewa/Khalti</span>
                </div>
                <p className="font-bold">Online Payment</p>
                <p className="text-sm text-text-dark/50">Coming soon</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg text-text-dark/60">Order Total</span>
              <span className="text-4xl font-extrabold text-primary-green">Rs. {totalPrice}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-primary-green text-white py-6 rounded-[2rem] font-bold text-2xl hover:bg-primary-green/90 transition-all shadow-xl shadow-primary-green/20 flex items-center justify-center gap-4 disabled:opacity-70"
            >
              {isProcessing ? (
                <><Loader2 className="animate-spin" size={28} /> Processing...</>
              ) : (
                'Place Order'
              )}
            </button>

            <Link to="/cart" className="flex items-center justify-center gap-2 text-text-dark/50 font-bold hover:text-primary-green transition-colors">
              <ArrowLeft size={18} /> Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
