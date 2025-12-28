
import { Product, ContactMessage } from '../types';
import { PRODUCTS } from '../constants';

/**
 * Robustly retrieves products from localStorage or initializes them if missing.
 */
const getStoredProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem('himalayan_products');
    if (!stored) {
      localStorage.setItem('himalayan_products', JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse products from localStorage:", error);
    return PRODUCTS;
  }
};

export const api = {
  // PRODUCTS CRUD
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredProducts()), 300);
    });
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      const products = getStoredProducts();
      setTimeout(() => {
        const product = products.find((p) => String(p.id) === String(id));
        resolve(product);
      }, 200);
    });
  },

  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return new Promise((resolve) => {
      const products = getStoredProducts();
      const newProduct = { ...product, id: `p-${Date.now()}` };
      const updated = [...products, newProduct];
      localStorage.setItem('himalayan_products', JSON.stringify(updated));
      setTimeout(() => resolve(newProduct), 500);
    });
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      const products = getStoredProducts();
      const index = products.findIndex(p => String(p.id) === String(id));
      if (index === -1) return reject("Product not found");
      
      const updatedProduct = { ...products[index], ...updates };
      products[index] = updatedProduct;
      localStorage.setItem('himalayan_products', JSON.stringify(products));
      setTimeout(() => resolve(updatedProduct), 500);
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      const products = getStoredProducts();
      const updated = products.filter(p => String(p.id) !== String(id));
      localStorage.setItem('himalayan_products', JSON.stringify(updated));
      setTimeout(() => resolve(), 400);
    });
  },

  // HERO SLIDES CRUD
  getHeroSlides: async () => {
    return new Promise((resolve) => {
      const stored = localStorage.getItem('himalayan_hero_slides') || '[]';
      setTimeout(() => resolve(JSON.parse(stored)), 300);
    });
  },

  addHeroSlide: async (slide: any) => {
    return new Promise((resolve) => {
      const slides = JSON.parse(localStorage.getItem('himalayan_hero_slides') || '[]');
      const newSlide = { ...slide, id: `slide-${Date.now()}`, order: slides.length + 1 };
      slides.push(newSlide);
      localStorage.setItem('himalayan_hero_slides', JSON.stringify(slides));
      setTimeout(() => resolve(newSlide), 500);
    });
  },

  updateHeroSlide: async (id: string, updates: any) => {
    return new Promise((resolve, reject) => {
      const slides = JSON.parse(localStorage.getItem('himalayan_hero_slides') || '[]');
      const index = slides.findIndex((s: any) => s.id === id);
      if (index === -1) return reject("Slide not found");
      slides[index] = { ...slides[index], ...updates };
      localStorage.setItem('himalayan_hero_slides', JSON.stringify(slides));
      setTimeout(() => resolve(slides[index]), 500);
    });
  },

  deleteHeroSlide: async (id: string) => {
    return new Promise((resolve) => {
      const slides = JSON.parse(localStorage.getItem('himalayan_hero_slides') || '[]');
      const updated = slides.filter((s: any) => s.id !== id);
      localStorage.setItem('himalayan_hero_slides', JSON.stringify(updated));
      setTimeout(() => resolve(), 400);
    });
  },

  // AUTH
  login: async (email: string, password: string): Promise<{ success: boolean; token?: string }> => {
    return new Promise((resolve) => {
      const admins = JSON.parse(localStorage.getItem('himalayan_admins') || '[]');
      const admin = admins.find((a: any) => a.email === email && a.password === password);
      
      if ((email === 'admin@himalayan.com' && password === 'admin123') || admin) {
        localStorage.setItem('himalayan_auth', 'true');
        resolve({ success: true, token: 'mock-jwt-token' });
      } else {
        resolve({ success: false });
      }
    });
  },

  registerAdmin: async (adminData: any): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      const admins = JSON.parse(localStorage.getItem('himalayan_admins') || '[]');
      admins.push(adminData);
      localStorage.setItem('himalayan_admins', JSON.stringify(admins));
      resolve({ success: true });
    });
  },

  logout: () => {
    localStorage.removeItem('himalayan_auth');
  },

  isAuthenticated: () => {
    return localStorage.getItem('himalayan_auth') === 'true';
  },

  // CONTACT
  submitContact: async (message: ContactMessage): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      const existing = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      existing.push(message);
      localStorage.setItem('contact_messages', JSON.stringify(existing));
      setTimeout(() => resolve({ success: true }), 1000);
    });
  }
};
