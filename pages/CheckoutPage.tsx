
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowLeft, Loader2, User, Phone, MapPin } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { sheetsService } from '../services/sheets';

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<OrderForm>({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  // Check if we just completed an order (success state)
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

  // Redirect to cart if no items (but not if we just completed an order)
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-neutral-bg min-h-screen py-24 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-lg w-full">
          <h2 className="text-3xl font-bold text-text-dark mb-4">No items in cart</h2>
          <p className="text-text-dark/60 mb-8">Please add items to your cart before checkout.</p>
          <Link to="/cart" className="inline-block bg-primary-green text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-green/90 mr-4">
            Go to Cart
          </Link>
          <Link to="/products" className="inline-block bg-neutral-bg text-text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-neutral-bg/80">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        products: cart.map(item => `${item.product.name} (${item.quantity}x)`).join(', '),
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
        status: 'Pending'
      };

      console.log('Sending order data:', orderData);
      
      // Save to Google Sheets
      const success = await sheetsService.saveOrder(orderData);
      
      if (success) {
        console.log('Order saved successfully');
        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
      } else {
        throw new Error('Failed to save order');
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      setIsProcessing(false);
      alert('Order submission failed. Please try again.');
    }
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-primary-green/5">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Customer Details</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">
                  <User size={16} className="inline mr-2" />Full Name
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ram Bahadur Shrestha"
                  className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">
                  <Phone size={16} className="inline mr-2" />Phone Number
                </label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="9840564096"
                  className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">
                  <MapPin size={16} className="inline mr-2" />Delivery Address
                </label>
                <textarea 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Banglamukhi, Lalitpur, Nepal"
                  className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all resize-none"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">
                  Email (Optional)
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="ram@example.com"
                  className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary-green transition-all"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-primary-green/5">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center py-3 border-b border-neutral-bg">
                  <div>
                    <h4 className="font-bold text-text-dark">{item.product.name}</h4>
                    <p className="text-sm text-text-dark/60">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-primary-green">Rs. {item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-bg pt-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-text-dark">Total Amount</span>
                <span className="text-3xl font-extrabold text-primary-green">Rs. {totalPrice}</span>
              </div>
              
              <div className="bg-primary-green/5 p-4 rounded-2xl mb-6">
                <p className="text-sm font-bold text-primary-green mb-2">Payment Method</p>
                <p className="text-text-dark">💰 Cash on Delivery (COD)</p>
              </div>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              disabled={isProcessing || !formData.name || !formData.phone || !formData.address}
              className="w-full bg-primary-green text-white py-6 rounded-[2rem] font-bold text-xl hover:bg-primary-green/90 transition-all shadow-xl shadow-primary-green/20 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <><Loader2 className="animate-spin" size={24} /> Processing Order...</>
              ) : (
                <>🛒 Place Order (Rs. {totalPrice})</>
              )}
            </button>

            <Link to="/cart" className="flex items-center justify-center gap-2 text-text-dark/50 font-bold hover:text-primary-green transition-colors mt-4">
              <ArrowLeft size={18} /> Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
