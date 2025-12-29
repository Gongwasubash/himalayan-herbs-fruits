
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf, Instagram, Facebook, Twitter, Shield } from 'lucide-react';
import { useCart } from '../store/cartStore';
import VoiceAssistant from './VoiceAssistant';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
  ];

  // Don't show regular layout wrapper for admin dashboard to allow sidebar full height
  if (location.pathname === '/admin/dashboard') {
     return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-accent-cream shadow-sm border-b border-primary-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-green p-2 rounded-lg text-white">
                <Leaf size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-primary-green font-bold text-xl leading-tight tracking-tight">HIMALAYAN</span>
                <span className="text-earth-brown text-sm font-semibold tracking-wider">HERBS & FRUITS</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-green ${
                    location.pathname === link.path ? 'text-primary-green border-b-2 border-primary-green' : 'text-text-dark'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/cart" className="relative p-2 text-text-dark hover:text-primary-green transition-colors">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-green text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-accent-cream">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-text-dark">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-green text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-dark">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-accent-cream border-t border-primary-green/10 py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-lg font-medium text-text-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Voice Assistant Overlay */}
      <VoiceAssistant />

      {/* Footer */}
      <footer className="bg-text-dark text-accent-cream pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* About Store */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Leaf className="text-primary-green" size={28} />
                <span className="text-2xl font-bold tracking-tight">Himalayan Herbs & Fruits</span>
              </Link>
              <p className="text-accent-cream/70 leading-relaxed max-w-md">
                Our mission is to support local Nepali farmers and promote organic Himalayan products. 
                Bringing the authentic taste of the mountains and the ancient wisdom of Himalayan herbs to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-primary-green">Quick Links</h4>
              <ul className="space-y-4 text-accent-cream/70">
                <li><Link to="/" className="hover:text-primary-green transition-colors">Home</Link></li>
                <li><Link to="/products" className="hover:text-primary-green transition-colors">All Products</Link></li>
                <li><Link to="/about" className="hover:text-primary-green transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary-green transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-primary-green">Stay Connected</h4>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="p-2 bg-accent-cream/10 rounded-full hover:bg-primary-green transition-colors"><Instagram size={20} /></a>
                <a href="#" className="p-2 bg-accent-cream/10 rounded-full hover:bg-primary-green transition-colors"><Facebook size={20} /></a>
                <a href="#" className="p-2 bg-accent-cream/10 rounded-full hover:bg-primary-green transition-colors"><Twitter size={20} /></a>
              </div>
              <Link to="/admin/dashboard" className="flex items-center gap-2 text-primary-green/60 hover:text-primary-green transition-colors text-sm font-medium">
                <Shield size={16} /> Admin Portal
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-accent-cream/10 text-center text-sm text-accent-cream/50">
            <p>© 2025 Himalayan Herbs & Fruits. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
