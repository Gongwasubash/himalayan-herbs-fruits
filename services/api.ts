import { Product, ContactMessage } from '../types';
import { sheetsService } from './sheets';

export const api = {
  // PRODUCTS CRUD
  getProducts: async (): Promise<Product[]> => {
    try {
      return await sheetsService.getProducts();
    } catch (error) {
      console.error('Failed to fetch products from Google Sheets:', error);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      const products = await sheetsService.getProducts();
      return products.find((p) => String(p.id) === String(id));
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return undefined;
    }
  },

  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    // For Google Sheets, you'd need to implement append functionality
    throw new Error('Adding products to Google Sheets not implemented');
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    throw new Error('Updating products in Google Sheets not implemented');
  },

  deleteProduct: async (id: string): Promise<void> => {
    throw new Error('Deleting products from Google Sheets not implemented');
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
      if (email === 'admin@himalayan.com' && password === 'admin123') {
        localStorage.setItem('himalayan_auth', 'true');
        resolve({ success: true, token: 'mock-jwt-token' });
      } else {
        resolve({ success: false });
      }
    });
  },

  registerAdmin: async (adminData: any): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
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