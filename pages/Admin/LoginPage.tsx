
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Lock, Mail, UserPlus, LogIn, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      await api.registerAdmin({ email, password });
      setIsRegister(false);
      setError('Account created! Please login.');
      setLoading(false);
    } else {
      const res = await api.login(email, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Try admin@himalayan.com / admin123');
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-primary-green/5">
        <div className="bg-primary-green p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-white/70">Manage Himalayan Herbs & Fruits</p>
        </div>

        <form onSubmit={handleAuth} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={18} />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="admin@himalayan.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-text-dark/70 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-brown/40" size={18} />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-primary-green"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-primary-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-green/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-green/20"
          >
            {loading ? 'Processing...' : (isRegister ? <><UserPlus size={20} /> Create Account</> : <><LogIn size={20} /> Login</>)}
          </button>

          <p className="text-center text-sm text-text-dark/50">
            {isRegister ? "Already have an account?" : "Need a new admin account?"}{" "}
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary-green font-bold hover:underline"
            >
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
