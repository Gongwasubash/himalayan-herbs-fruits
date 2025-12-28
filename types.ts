
export enum Category {
  HERBS = 'Jadibuti',
  FRUITS = 'Local Fruits'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  benefits: string;
  image: string;
  nepaliName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
