
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { useCart } from '../store/cartStore';
import { Filter, Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentCategory = searchParams.get('category');
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = products;
    if (currentCategory) {
      result = result.filter(p => p.category === currentCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.nepaliName.includes(searchQuery)
      );
    }
    setFilteredProducts(result);
  }, [products, currentCategory, searchQuery]);

  const categories = Object.values(Category);

  return (
    <div className="bg-accent-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-text-dark mb-2">Our Store</h1>
            <p className="text-earth-brown font-medium">Authentic Himalayan Herbs & Local Fruits</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-brown/50" size={18} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border border-primary-green/10 bg-white w-full sm:w-64 focus:ring-2 focus:ring-primary-green outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              <button 
                onClick={() => setSearchParams({})}
                className={`px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                  !currentCategory ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' : 'bg-white text-text-dark border border-primary-green/10 hover:border-primary-green/50'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                    currentCategory === cat ? 'bg-primary-green text-white shadow-lg shadow-primary-green/20' : 'bg-white text-text-dark border border-primary-green/10 hover:border-primary-green/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-green"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary-green/5 group flex flex-col h-full">
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary-green uppercase tracking-widest">{product.category}</span>
                    <span className="text-xs font-medium text-earth-brown bg-neutral-bg px-2 py-1 rounded">{product.nepaliName}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary-green transition-colors">{product.name}</h3>
                  <p className="text-text-dark/60 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-bg">
                    <span className="text-2xl font-bold text-primary-green">Rs. {product.price}</span>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="p-3 bg-primary-green text-white rounded-xl hover:bg-primary-green/90 transition-transform active:scale-95"
                      title="Add to Cart"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-primary-green/20">
            <Filter size={48} className="mx-auto text-primary-green/20 mb-4" />
            <h3 className="text-xl font-bold text-text-dark mb-2">No products found</h3>
            <p className="text-earth-brown">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
