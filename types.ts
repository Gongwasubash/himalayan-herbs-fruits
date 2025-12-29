
export enum Category {
  SUPERFOOD = 'Superfood',
  FLOUR_MILLETS = 'Flour & Millets',
  HONEY = 'Honey',
  FRUITS = 'Fruits',
  LOCAL_RICE = 'Local Rice',
  LENTILS_BEANS = 'Lentils/Beans',
  LENTILS = 'Lentils',
  GRAINS = 'Grains',
  FLOUR = 'Flour',
  HERB = 'Herb',
  SPICE = 'Spice',
  MEAT = 'Meat'
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
