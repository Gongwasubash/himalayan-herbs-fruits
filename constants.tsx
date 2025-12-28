import { Product, Category, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  // HERBS / JADIBUTI
  {
    id: 'h1',
    name: 'Timur (Sichuan Pepper)',
    nepaliName: 'टिमुर',
    category: Category.HERBS,
    price: 450,
    description: 'Nepali Timur spice with citrus aroma - used in achar and curries.',
    benefits: 'Enhances flavor, supports digestion.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Sichuan_pepper.jpg'
  },
  // LOCAL NEPALI FRUITS
  {
    id: 'f1',
    name: 'Jumla Apple (Organic)',
    nepaliName: 'जुम्लाको स्याउ',
    category: Category.FRUITS,
    price: 300,
    description: 'Organic apples from Jumla, sweet and crisp.',
    benefits: 'High in fiber and antioxidants.',
    image: 'https://nepalorganicghar.com/2025/08/17/jumla-apple/turn0image9.jpg'
  },
  {
    id: 'f2',
    name: 'Dhankuta Orange',
    nepaliName: 'धनकुटाको सुन्तला',
    category: Category.FRUITS,
    price: 220,
    description: 'Juicy and vitamin-rich orange.',
    benefits: 'Excellent source of Vitamin C.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg'
  },
  {
    id: 'f3',
    name: 'Sankhuwasabha Kiwi',
    nepaliName: 'सङ्खुवासभाको किवी',
    category: Category.FRUITS,
    price: 500,
    description: 'Fresh kiwi fruit rich in nutrients.',
    benefits: 'Boosts immunity and skin health.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg'
  },
  {
    id: 'f4',
    name: 'Syangja Banana',
    nepaliName: 'स्याङ्जाको केरा',
    category: Category.FRUITS,
    price: 180,
    description: 'Fresh bananas from Syangja, sweet and energy-rich.',
    benefits: 'Great source of potassium and natural energy.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg'
  },
  {
    id: 'f5',
    name: 'Rajapur Mango',
    nepaliName: 'राजापुरको आँप',
    category: Category.FRUITS,
    price: 400,
    description: 'Rich and juicy mango.',
    benefits: 'Supports eyesight and digestion.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ram Kumar Shrestha',
    text: 'जुम्लाको स्याउको मिठो स्वाद यहाँ भेटियो। बजारमा पाइने भन्दा धेरै फरक र अर्गानिक छ।',
    location: 'Kathmandu, Nepal'
  },
  {
    id: 't2',
    name: 'Anjali Gurung',
    text: 'ताजा जडीबुटी — मन पर्यो। टिमुरको बासना साच्चै कडा र उत्कृष्ट छ। प्याकेजिङ पनि राम्रो छ।',
    location: 'Pokhara, Nepal'
  },
  {
    id: 't3',
    name: 'David Wilson',
    text: 'Nepali local products with great packaging. The Kurilo roots are authentic and high quality.',
    location: 'Expat in Nepal'
  }
];