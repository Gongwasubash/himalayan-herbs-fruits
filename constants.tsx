
import { Product, Category, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  // HERBS
  {
    id: 'h1',
    name: 'Timur (Sichuan Pepper)',
    nepaliName: 'टिमुर',
    category: Category.HERBS,
    price: 450,
    description: 'High-altitude Sichuan pepper with intense citrus aroma and numbing sensation.',
    benefits: 'Aids digestion, relieves pain, and boosts immunity.',
    image: 'https://picsum.photos/seed/timur/600/400'
  },
  {
    id: 'h2',
    name: 'Sugandhawal (Siltimur)',
    nepaliName: 'सुगन्धवाल',
    category: Category.HERBS,
    price: 550,
    description: 'Aromatic herb found in temperate Himalayas, known for its distinct earthy fragrance.',
    benefits: 'Used in treating nerve disorders and digestive issues.',
    image: 'https://picsum.photos/seed/sugandhawal/600/400'
  },
  {
    id: 'h3',
    name: 'Kurilo Roots',
    nepaliName: 'कुरिलोको जरा',
    category: Category.HERBS,
    price: 800,
    description: 'Wild asparagus roots harvested from deep Himalayan forests.',
    benefits: 'Rich in antioxidants and supports overall vitality.',
    image: 'https://picsum.photos/seed/kurilo/600/400'
  },
  {
    id: 'h4',
    name: 'Padamchal',
    nepaliName: 'पदमचाल',
    category: Category.HERBS,
    price: 600,
    description: 'Himalayan Rhubarb root, naturally dried and processed.',
    benefits: 'Effective for stomach ailments and blood purification.',
    image: 'https://picsum.photos/seed/padamchal/600/400'
  },
  {
    id: 'h5',
    name: 'Jatamasi',
    nepaliName: 'जटामसी',
    category: Category.HERBS,
    price: 1200,
    description: 'Spikenard root, highly valued for its calming and aromatic properties.',
    benefits: 'Promotes sleep, reduces anxiety, and supports hair health.',
    image: 'https://picsum.photos/seed/jatamasi/600/400'
  },
  {
    id: 'h6',
    name: 'Titepati Tea',
    nepaliName: 'तितेपाती चिया',
    category: Category.HERBS,
    price: 350,
    description: 'Traditional Mugwort tea, sun-dried and hand-picked.',
    benefits: 'Anti-inflammatory and excellent for digestive health.',
    image: 'https://picsum.photos/seed/titepati/600/400'
  },
  // FRUITS
  {
    id: 'f1',
    name: 'Jumla Apple (Organic)',
    nepaliName: 'जुम्लाको स्याउ',
    category: Category.FRUITS,
    price: 250,
    description: 'Sweet and crunchy apples grown in the organic orchards of Jumla.',
    benefits: 'High fiber, vitamins, and minerals. 100% Organic.',
    image: 'https://picsum.photos/seed/apple/600/400'
  },
  {
    id: 'f2',
    name: 'Dhankuta Orange',
    nepaliName: 'धनकुटाको सुन्तला',
    category: Category.FRUITS,
    price: 180,
    description: 'Famous juicy oranges from the hills of Dhankuta.',
    benefits: 'Loaded with Vitamin C and natural energy.',
    image: 'https://picsum.photos/seed/orange/600/400'
  },
  {
    id: 'f3',
    name: 'Mustang Chuli Apple',
    nepaliName: 'मुस्ताङको स्याउ',
    category: Category.FRUITS,
    price: 280,
    description: 'Premium quality apples from the dry high-altitude landscape of Mustang.',
    benefits: 'Distinct flavor profile and long shelf life.',
    image: 'https://picsum.photos/seed/mustang/600/400'
  },
  {
    id: 'f4',
    name: 'Sankhuwasabha Kiwi',
    nepaliName: 'सङ्खुवासभाको किवी',
    category: Category.FRUITS,
    price: 400,
    description: 'Luscious, tangy kiwis grown in the eastern hills of Nepal.',
    benefits: 'High in Vitamin E and antioxidants.',
    image: 'https://picsum.photos/seed/kiwi/600/400'
  },
  {
    id: 'f5',
    name: 'Rajapur Mango',
    nepaliName: 'राजापुरको आँप',
    category: Category.FRUITS,
    price: 220,
    description: 'Tropical mangoes from the fertile plains of Rajapur, Bardiya.',
    benefits: 'Rich in Vitamin A and tropical sweetness.',
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
    text: 'ताजा जडीबुटी — मन पर्‍यो। टिमुरको बासना साच्चै कडा र उत्कृष्ट छ। प्याकेजिङ पनि राम्रो छ।',
    location: 'Pokhara, Nepal'
  },
  {
    id: 't3',
    name: 'David Wilson',
    text: 'Nepali local products with great packaging. The Kurilo roots are authentic and high quality.',
    location: 'Expat in Nepal'
  }
];
