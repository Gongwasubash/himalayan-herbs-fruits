
import { Product, ContactMessage } from '../types';
import { firestoreService } from './firestore';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';
const USE_FIRESTORE = true; // Toggle between Firestore and local backend

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('himalayan_token');
};

// Helper function to make authenticated requests
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  // PRODUCTS CRUD
  getProducts: async (): Promise<Product[]> => {
    if (USE_FIRESTORE) {
      try {
        return await firestoreService.getProducts();
      } catch (error) {
        console.error('Firestore error:', error);
        return [];
      }
    }
    try {
      return await makeRequest('/products');
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    try {
      return await makeRequest(`/products/${id}`);
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return undefined;
    }
  },

  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    return await makeRequest('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    return await makeRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    await makeRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // AUTH
  login: async (email: string, password: string): Promise<{ success: boolean; token?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success && data.token) {
        localStorage.setItem('himalayan_token', data.token);
        localStorage.setItem('himalayan_auth', 'true');
        return { success: true, token: data.token };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  },

  registerAdmin: async (adminData: { email: string; password: string }): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();
      return { success: data.success };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false };
    }
  },

  logout: () => {
    localStorage.removeItem('himalayan_token');
    localStorage.removeItem('himalayan_auth');
  },

  isAuthenticated: () => {
    return localStorage.getItem('himalayan_auth') === 'true' && getAuthToken() !== null;
  },

  // IMAGE UPLOAD
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.imageUrl;
  },

  // HERO SLIDER
  getHeroSlides: async (): Promise<any[]> => {
    try {
      return await makeRequest('/hero-slides');
    } catch (error) {
      console.error('Failed to fetch hero slides:', error);
      return [];
    }
  },

  addHeroSlide: async (slide: any): Promise<any> => {
    try {
      return await makeRequest('/hero-slides', {
        method: 'POST',
        body: JSON.stringify(slide),
      });
    } catch (error) {
      console.error('API Error adding hero slide:', error);
      throw error;
    }
  },

  updateHeroSlide: async (id: string, updates: any): Promise<any> => {
    try {
      return await makeRequest(`/hero-slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('API Error updating hero slide:', error);
      throw error;
    }
  },

  deleteHeroSlide: async (id: string): Promise<void> => {
    await makeRequest(`/hero-slides/${id}`, {
      method: 'DELETE',
    });
  },

  // CONTACT
  submitContact: async (message: ContactMessage): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      return { success: data.success };
    } catch (error) {
      console.error('Contact submission failed:', error);
      return { success: false };
    }
  },

  getContactMessages: async (): Promise<ContactMessage[]> => {
    try {
      return await makeRequest('/contact');
    } catch (error) {
      console.error('Failed to fetch contact messages:', error);
      return [];
    }
  },

  // USER AUTH
  userRegister: async (userData: { name: string; email: string; phone: string; password: string }) => {
    if (USE_FIRESTORE) {
      try {
        const user = await firestoreService.registerUser(userData.email, userData.password, {
          name: userData.name,
          phone: userData.phone,
          email: userData.email
        });
        return { success: true, user: { id: user.uid, name: userData.name, email: userData.email } };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false };
    }
  },

  userLogin: async (email: string, password: string) => {
    if (USE_FIRESTORE) {
      try {
        const userCredential = await firestoreService.loginUser(email, password);
        return { 
          success: true, 
          user: { 
            id: userCredential.user.uid, 
            email: userCredential.user.email,
            name: userCredential.user.displayName || 'User'
          } 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  },

  // ORDERS
  createOrder: async (orderData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error('Order creation failed:', error);
      return { success: false };
    }
  },

  getUserOrders: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${userId}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
      return [];
    }
  }
};
