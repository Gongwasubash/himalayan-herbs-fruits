import { Product, Category, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  // HERBS / JADIBUTI
  {
    id: 'h1',
    name: 'Timur (Sichuan Pepper)',
    nepaliName: 'टिमुर',
    category: Category.HERBS,
    price: 450,
    description: 'Strong aromatic Nepali spice from the Himalayas with citrus-like aroma.',
    benefits: 'Improves digestion, relieves mouth numbness, used in pickles and achar.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Sichuan_pepper.jpg'
  },
  {
    id: 'h2',
    name: 'Sugandhawal (Siltimur)',
    nepaliName: 'सुगन्धवाल',
    category: Category.HERBS,
    price: 550,
    description: 'Wild aromatic plant used in incense and traditional remedies.',
    benefits: 'Helps with stress relief and air purification.',
    image: 'https://picsum.photos/seed/sugandhawal/600/400'
  },
  {
    id: 'h3',
    name: 'Kurilo Roots',
    nepaliName: 'कुरिलोको जरा',
    category: Category.HERBS,
    price: 600,
    description: 'Traditional Himalayan herb root known for vitality and wellness.',
    benefits: 'Good for reproductive health and immune support.',
    image: 'https://picsum.photos/seed/kurilo/600/400'
  },
  {
    id: 'h4',
    name: 'Padamchal',
    nepaliName: 'पदमचाल',
    category: Category.HERBS,
    price: 520,
    description: 'Medicinal herb from Nepal hills used in Ayurveda.',
    benefits: 'Supports joint health and immunity.',
    image: 'https://picsum.photos/seed/padamchal/600/400'
  },
  {
    id: 'h5',
    name: 'Jatamasi',
    nepaliName: 'जटामसी',
    category: Category.HERBS,
    price: 750,
    description: 'Hair and wellness herb used in traditional Himalayan remedies.',
    benefits: 'Supports hair growth and stress reduction.',
    image: 'https://picsum.photos/seed/jatamasi/600/400'
  },
  {
    id: 'h6',
    name: 'Bojho',
    nepaliName: 'बोझो',
    category: Category.HERBS,
    price: 480,
    description: 'Popular Nepali medicinal root used for cough and digestion.',
    benefits: 'Improves throat health and digestion.',
    image: 'https://picsum.photos/seed/bojho/600/400'
  },
  {
    id: 'h7',
    name: 'Ban Lasun (Wild Garlic)',
    nepaliName: 'बन लसुन',
    category: Category.HERBS,
    price: 650,
    description: 'Natural wild garlic found in Himalayan regions.',
    benefits: 'Improves heart health and boosts immunity.',
    image: 'https://picsum.photos/seed/banlasun/600/400'
  },
  {
    id: 'h8',
    name: 'Titepati Tea',
    nepaliName: 'तितेपाती चिया',
    category: Category.HERBS,
    price: 400,
    description: 'Herbal tea made from Artemisia (Titepati).',
    benefits: 'Useful for relaxation and stomach issues.',
    image: 'https://picsum.photos/seed/titepati/600/400'
  },
  // LOCAL NEPALI FRUITS
  {
    id: 'f1',
    name: 'Jumla Apple (Organic)',
    nepaliName: 'जुम्लाको स्याउ',
    category: Category.FRUITS,
    price: 300,
    description: 'Famous organic apples grown in Jumla.',
    benefits: 'Rich in fiber and antioxidants.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Himachal_Fresh_Apple_01.JPG'
  },
  {
    id: 'f2',
    name: 'Dhankuta Orange',
    nepaliName: 'धनकुटाको सुन्तला',
    category: Category.FRUITS,
    price: 220,
    description: 'Sweet and juicy oranges from Dhankuta.',
    benefits: 'High in Vitamin C and immunity boosting.',
    image: 'https://picsum.photos/seed/orange/600/400'
  },
  {
    id: 'f3',
    name: 'Mustang Chuli Apple',
    nepaliName: 'मुस्ताङको स्याउ',
    category: Category.FRUITS,
    price: 350,
    description: 'Red mountain apples from Mustang.',
    benefits: 'Good for digestion and vitamin rich.',
    image: 'https://picsum.photos/seed/mustang/600/400'
  },
  {
    id: 'f4',
    name: 'Sankhuwasabha Kiwi',
    nepaliName: 'सङ्खुवासभाको किवी',
    category: Category.FRUITS,
    price: 500,
    description: 'Fresh kiwi grown in Himalayan foothills.',
    benefits: 'Boosts immunity and skin health.',
    image: 'https://picsum.photos/seed/kiwi/600/400'
  },
  {
    id: 'f5',
    name: 'Syangja Banana',
    nepaliName: 'स्याङ्जाको केरा',
    category: Category.FRUITS,
    price: 180,
    description: 'Naturally ripened sweet bananas from Syangja.',
    benefits: 'Good source of potassium and energy.',
    image: 'https://picsum.photos/seed/banana/600/400'
  },
  {
    id: 'f6',
    name: 'Rajapur Mango',
    nepaliName: 'राजापुरको आँप',
    category: Category.FRUITS,
    price: 400,
    description: 'Juicy mangoes from Rajapur, Bardiya.',
    benefits: 'Supports eyesight and digestion.',
    image: 'https://picsum.photos/seed/mango/600/400'
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