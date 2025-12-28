
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { Plus, Edit2, Trash2, LayoutDashboard, LogOut, Package, Image as ImageIcon, X, Check, Loader2, Monitor, Eye, EyeOff } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
}

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'hero'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const navigate = useNavigate();

  // Form state for products
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    nepaliName: '',
    category: Category.FRUITS,
    price: 0,
    description: '',
    benefits: '',
    image: ''
  });

  // Form state for hero slides
  const [slideFormData, setSlideFormData] = useState<Omit<HeroSlide, 'id' | 'order'>>({
    title: '',
    subtitle: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    isActive: true
  });

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, slidesData] = await Promise.all([
        api.getProducts(),
        api.getHeroSlides()
      ]);
      setProducts(productsData);
      setHeroSlides(slidesData.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    navigate('/admin/login');
  };

  const openProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ ...product });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        nepaliName: '',
        category: Category.FRUITS,
        price: 0,
        description: '',
        benefits: '',
        image: ''
      });
    }
    setEditingSlide(null);
    setIsModalOpen(true);
  };

  const openSlideModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideFormData({ ...slide });
    } else {
      setEditingSlide(null);
      setSlideFormData({
        title: '',
        subtitle: '',
        image: '',
        buttonText: '',
        buttonLink: '',
        isActive: true
      });
    }
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
      } else {
        await api.addProduct(formData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      alert("Error saving product. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      console.log('Submitting slide data:', slideFormData);
      if (editingSlide) {
        await api.updateHeroSlide(editingSlide.id, slideFormData);
      } else {
        await api.addHeroSlide(slideFormData);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (error) {
      console.error('Error saving slide:', error);
      alert(`Error saving slide: ${error.message || 'Please try again.'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleProductDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const previousProducts = [...products];
      setProducts(products.filter(p => p.id !== id));
      
      try {
        await api.deleteProduct(id);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete product. Please try again.");
        setProducts(previousProducts);
      }
    }
  };

  const handleSlideDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      const previousSlides = [...heroSlides];
      setHeroSlides(heroSlides.filter(s => s.id !== id));
      
      try {
        await api.deleteHeroSlide(id);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete slide. Please try again.");
        setHeroSlides(previousSlides);
      }
    }
  };

  const toggleSlideActive = async (slide: HeroSlide) => {
    try {
      await api.updateHeroSlide(slide.id, { ...slide, isActive: !slide.isActive });
      await loadData();
    } catch (error) {
      alert("Failed to update slide status.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-text-dark text-white hidden md:flex flex-col border-r border-white/5">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="text-primary-green" /> Admin Panel
          </h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products' 
                ? 'bg-primary-green/20 text-primary-green' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'hero' 
                ? 'bg-primary-green/20 text-primary-green' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Monitor size={20} /> Hero Slider
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-dark">
                {activeTab === 'products' ? 'Product Management' : 'Hero Slider Management'}
              </h1>
              <p className="text-earth-brown">
                {activeTab === 'products' 
                  ? 'Manage your store inventory and change pictures' 
                  : 'Manage homepage hero slider content'
                }
              </p>
            </div>
            <button 
              onClick={() => activeTab === 'products' ? openProductModal() : openSlideModal()}
              className="bg-primary-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-green/90 shadow-lg shadow-primary-green/20 active:scale-95 transition-all"
            >
              <Plus size={20} /> {activeTab === 'products' ? 'Add Product' : 'Add Slide'}
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-primary-green" size={40} />
              <p className="text-earth-brown font-medium">Loading data...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-primary-green/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'products' ? (
                <ProductsTable 
                  products={products} 
                  onEdit={openProductModal} 
                  onDelete={handleProductDelete} 
                />
              ) : (
                <HeroSlidesTable 
                  slides={heroSlides} 
                  onEdit={openSlideModal} 
                  onDelete={handleSlideDelete}
                  onToggleActive={toggleSlideActive}
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-text-dark/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-neutral-bg flex justify-between items-center sticky top-0 bg-white z-20">
              <div>
                <h3 className="text-2xl font-bold text-text-dark">
                  {editingProduct 
                    ? 'Edit Product' 
                    : editingSlide 
                    ? 'Edit Slide' 
                    : activeTab === 'products' 
                    ? 'Add New Product' 
                    : 'Add New Slide'
                  }
                </h3>
                <p className="text-xs text-earth-brown mt-1">
                  {activeTab === 'products' 
                    ? 'Fill in the details below to update your store.' 
                    : 'Create engaging hero slider content.'
                  }
                </p>
              </div>
              <button 
                onClick={() => !actionLoading && setIsModalOpen(false)} 
                className="p-2 hover:bg-neutral-bg rounded-full transition-colors disabled:opacity-50"
                disabled={actionLoading}
              >
                <X />
              </button>
            </div>
            
            {activeTab === 'products' ? (
              <form onSubmit={handleProductSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Product Name (EN)</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" placeholder="e.g. Organic Apple" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Product Name (NP)</label>
                    <input required value={formData.nepaliName} onChange={(e) => setFormData({...formData, nepaliName: e.target.value})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" placeholder="e.g. जैविक स्याउ" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as Category})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green">
                      {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Price (Rs.)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Image URL</label>
                  <div className="flex gap-4">
                     <div className="relative flex-grow">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark/30" size={18} />
                      <input 
                        required 
                        placeholder="Paste image URL here..."
                        value={formData.image} 
                        onChange={(e) => setFormData({...formData, image: e.target.value})} 
                        className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" 
                      />
                    </div>
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-neutral-bg shrink-0 shadow-inner bg-neutral-bg flex items-center justify-center">
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=ERR'; }}
                        />
                      ) : (
                        <ImageIcon size={24} className="text-text-dark/20" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Description</label>
                  <textarea required rows={2} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green resize-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Health Benefits</label>
                  <textarea required rows={2} value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green resize-none" />
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="flex-grow bg-neutral-bg py-4 rounded-2xl font-bold hover:bg-neutral-bg/80 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={actionLoading}
                    className="flex-grow bg-primary-green text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/20 disabled:opacity-70"
                  >
                    {actionLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <><Check size={20} /> {editingProduct ? 'Update Product' : 'Save Product'}</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSlideSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Slide Title</label>
                  <input 
                    required 
                    value={slideFormData.title} 
                    onChange={(e) => setSlideFormData({...slideFormData, title: e.target.value})} 
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" 
                    placeholder="e.g. Authentic Himalayan Herbs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Subtitle</label>
                  <textarea 
                    required 
                    rows={3}
                    value={slideFormData.subtitle} 
                    onChange={(e) => setSlideFormData({...slideFormData, subtitle: e.target.value})} 
                    className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green resize-none" 
                    placeholder="Describe your slide content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Background Image URL</label>
                  <div className="flex gap-4">
                    <div className="relative flex-grow">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark/30" size={18} />
                      <input 
                        required 
                        placeholder="Paste image URL here..."
                        value={slideFormData.image} 
                        onChange={(e) => setSlideFormData({...slideFormData, image: e.target.value})} 
                        className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" 
                      />
                    </div>
                    <div className="w-20 h-12 rounded-lg overflow-hidden border border-neutral-bg shrink-0 shadow-inner bg-neutral-bg flex items-center justify-center">
                      {slideFormData.image ? (
                        <img 
                          src={slideFormData.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x120?text=ERR'; }}
                        />
                      ) : (
                        <ImageIcon size={16} className="text-text-dark/20" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Button Text</label>
                    <input 
                      required 
                      value={slideFormData.buttonText} 
                      onChange={(e) => setSlideFormData({...slideFormData, buttonText: e.target.value})} 
                      className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" 
                      placeholder="e.g. Shop Now"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-dark/70 mb-2 uppercase tracking-tight">Button Link</label>
                    <input 
                      required 
                      value={slideFormData.buttonLink} 
                      onChange={(e) => setSlideFormData({...slideFormData, buttonLink: e.target.value})} 
                      className="w-full bg-neutral-bg/50 border border-primary-green/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-green" 
                      placeholder="e.g. /products"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={slideFormData.isActive} 
                      onChange={(e) => setSlideFormData({...slideFormData, isActive: e.target.checked})} 
                      className="w-5 h-5 text-primary-green bg-neutral-bg border-primary-green/20 rounded focus:ring-primary-green focus:ring-2"
                    />
                    <span className="text-sm font-bold text-text-dark/70 uppercase tracking-tight">Active (Show on homepage)</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow bg-neutral-bg py-4 rounded-2xl font-bold hover:bg-neutral-bg/80 transition-colors"
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={actionLoading}
                    className="flex-grow bg-primary-green text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/20 disabled:opacity-70"
                  >
                    {actionLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <><Check size={20} /> {editingSlide ? 'Update Slide' : 'Save Slide'}</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Products Table Component
const ProductsTable: React.FC<{
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}> = ({ products, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-neutral-bg/50 border-b border-primary-green/5">
        <tr>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Image</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Name</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Category</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Price</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-bg">
        {products.length > 0 ? products.map((p) => (
          <tr key={p.id} className="hover:bg-neutral-bg/20 transition-colors group">
            <td className="px-6 py-4">
              <img 
                src={p.image} 
                className="w-14 h-14 rounded-xl object-cover border border-neutral-bg shadow-sm group-hover:scale-105 transition-transform" 
                alt={p.name} 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image'; }}
              />
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-text-dark leading-tight">{p.name}</div>
              <div className="text-xs text-primary-green font-medium mt-1">{p.nepaliName}</div>
            </td>
            <td className="px-6 py-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-accent-cream px-3 py-1 rounded-full border border-primary-green/10 text-primary-green">
                {p.category}
              </span>
            </td>
            <td className="px-6 py-4 font-bold text-earth-brown">Rs. {p.price}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(p)} 
                  className="p-2 text-primary-green hover:bg-primary-green/10 rounded-lg transition-all"
                  title="Edit Product"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(p.id)} 
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Product"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={5} className="px-6 py-20 text-center">
              <Package size={48} className="mx-auto text-neutral-bg mb-4" />
              <p className="text-text-dark/50 font-medium">No products found in the store.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Hero Slides Table Component
const HeroSlidesTable: React.FC<{
  slides: HeroSlide[];
  onEdit: (slide: HeroSlide) => void;
  onDelete: (id: string) => void;
  onToggleActive: (slide: HeroSlide) => void;
}> = ({ slides, onEdit, onDelete, onToggleActive }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-neutral-bg/50 border-b border-primary-green/5">
        <tr>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Image</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Title</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Button</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Status</th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-text-dark/50 tracking-widest">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-bg">
        {slides.length > 0 ? slides.map((s) => (
          <tr key={s.id} className="hover:bg-neutral-bg/20 transition-colors group">
            <td className="px-6 py-4">
              <img 
                src={s.image} 
                className="w-20 h-12 rounded-lg object-cover border border-neutral-bg shadow-sm group-hover:scale-105 transition-transform" 
                alt={s.title} 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x120?text=No+Image'; }}
              />
            </td>
            <td className="px-6 py-4">
              <div className="font-bold text-text-dark leading-tight">{s.title}</div>
              <div className="text-xs text-earth-brown mt-1 line-clamp-2">{s.subtitle}</div>
            </td>
            <td className="px-6 py-4">
              <span className="text-xs bg-primary-green/10 text-primary-green px-2 py-1 rounded-full">
                {s.buttonText}
              </span>
            </td>
            <td className="px-6 py-4">
              <button
                onClick={() => onToggleActive(s)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  s.isActive 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {s.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                {s.isActive ? 'Active' : 'Inactive'}
              </button>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(s)} 
                  className="p-2 text-primary-green hover:bg-primary-green/10 rounded-lg transition-all"
                  title="Edit Slide"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => onDelete(s.id)} 
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete Slide"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={5} className="px-6 py-20 text-center">
              <Monitor size={48} className="mx-auto text-neutral-bg mb-4" />
              <p className="text-text-dark/50 font-medium">No hero slides found.</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default DashboardPage;
