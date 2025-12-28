// Run this in browser console to populate localStorage with new products
const PRODUCTS = [
  // HERBS / JADIBUTI
  {
    id: 'h1',
    name: 'Timur (Sichuan Pepper)',
    nepaliName: 'टिमुर',
    category: 'Jadibuti',
    price: 450,
    description: 'High-altitude Sichuan pepper with intense citrus aroma and numbing sensation.',
    benefits: 'Aids digestion, relieves pain, and boosts immunity.',
    image: 'https://picsum.photos/seed/timur/600/400'
  },
  {
    id: 'h2',
    name: 'Sugandhawal (Siltimur)',
    nepaliName: 'सुगन्धवाल',
    category: 'Jadibuti',
    price: 550,
    description: 'Aromatic herb found in temperate Himalayas, known for its distinct earthy fragrance.',
    benefits: 'Used in treating nerve disorders and digestive issues.',
    image: 'https://picsum.photos/seed/sugandhawal/600/400'
  },
  {
    id: 'h3',
    name: 'Kurilo Roots',
    nepaliName: 'कुरिलोको जरा',
    category: 'Jadibuti',
    price: 800,
    description: 'Wild asparagus roots harvested from deep Himalayan forests.',
    benefits: 'Rich in antioxidants and supports overall vitality.',
    image: 'https://picsum.photos/seed/kurilo/600/400'
  },
  {
    id: 'h4',
    name: 'Padamchal',
    nepaliName: 'पदमचाल',
    category: 'Jadibuti',
    price: 600,
    description: 'Himalayan Rhubarb root, naturally dried and processed.',
    benefits: 'Effective for stomach ailments and blood purification.',
    image: 'https://picsum.photos/seed/padamchal/600/400'
  },
  {
    id: 'h5',
    name: 'Jatamasi',
    nepaliName: 'जटामसी',
    category: 'Jadibuti',
    price: 1200,
    description: 'Spikenard root, highly valued for its calming and aromatic properties.',
    benefits: 'Promotes sleep, reduces anxiety, and supports hair health.',
    image: 'https://picsum.photos/seed/jatamasi/600/400'
  },
  {
    id: 'h6',
    name: 'Bojho',
    nepaliName: 'बोझो',
    category: 'Jadibuti',
    price: 750,
    description: 'Traditional Himalayan herb with sweet flag properties.',
    benefits: 'Enhances memory, treats respiratory issues, and calms the mind.',
    image: 'https://picsum.photos/seed/bojho/600/400'
  },
  {
    id: 'h7',
    name: 'Ban Lasun (Wild Garlic)',
    nepaliName: 'बन लसुन',
    category: 'Jadibuti',
    price: 400,
    description: 'Wild garlic from high-altitude regions with potent medicinal properties.',
    benefits: 'Boosts immunity, reduces cholesterol, and has antibacterial effects.',
    image: 'https://picsum.photos/seed/banlasun/600/400'
  },
  {
    id: 'h8',
    name: 'Titepati Tea',
    nepaliName: 'तितेपाती चिया',
    category: 'Jadibuti',
    price: 350,
    description: 'Traditional Mugwort tea, sun-dried and hand-picked.',
    benefits: 'Anti-inflammatory and excellent for digestive health.',
    image: 'https://picsum.photos/seed/titepati/600/400'
  },
  // LOCAL NEPALI FRUITS
  {
    id: 'f1',
    name: 'Jumla Apple (Organic)',
    nepaliName: 'जुम्लाको स्याउ',
    category: 'Local Fruits',
    price: 250,
    description: 'Sweet and crunchy apples grown in the organic orchards of Jumla.',
    benefits: 'High fiber, vitamins, and minerals. 100% Organic.',
    image: 'https://picsum.photos/seed/apple/600/400'
  },
  {
    id: 'f2',
    name: 'Dhankuta Orange',
    nepaliName: 'धनकुटाको सुन्तला',
    category: 'Local Fruits',
    price: 180,
    description: 'Famous juicy oranges from the hills of Dhankuta.',
    benefits: 'Loaded with Vitamin C and natural energy.',
    image: 'https://picsum.photos/seed/orange/600/400'
  },
  {
    id: 'f3',
    name: 'Mustang Chuli Apple',
    nepaliName: 'मुस्ताङको स्याउ',
    category: 'Local Fruits',
    price: 280,
    description: 'Premium quality apples from the dry high-altitude landscape of Mustang.',
    benefits: 'Distinct flavor profile and long shelf life.',
    image: 'https://picsum.photos/seed/mustang/600/400'
  },
  {
    id: 'f4',
    name: 'Sankhuwasabha Kiwi',
    nepaliName: 'सङ्खुवासभाको किवी',
    category: 'Local Fruits',
    price: 400,
    description: 'Luscious, tangy kiwis grown in the eastern hills of Nepal.',
    benefits: 'High in Vitamin E and antioxidants.',
    image: 'https://picsum.photos/seed/kiwi/600/400'
  },
  {
    id: 'f5',
    name: 'Syangja Banana',
    nepaliName: 'स्याङ्जाको केरा',
    category: 'Local Fruits',
    price: 120,
    description: 'Sweet and nutritious bananas from the hills of Syangja.',
    benefits: 'Rich in potassium and natural sugars for instant energy.',
    image: 'https://picsum.photos/seed/banana/600/400'
  },
  {
    id: 'f6',
    name: 'Rajapur Mango',
    nepaliName: 'राजापुरको आँप',
    category: 'Local Fruits',
    price: 220,
    description: 'Tropical mangoes from the fertile plains of Rajapur, Bardiya.',
    benefits: 'Rich in Vitamin A and tropical sweetness.',
    image: 'https://picsum.photos/seed/mango/600/400'
  }
];

// Update localStorage
localStorage.setItem('himalayan_products', JSON.stringify(PRODUCTS));
console.log('✅ Updated localStorage with 14 products (8 herbs + 6 fruits)');
console.log('🌿 Herbs/Jadibuti:', PRODUCTS.filter(p => p.category === 'Jadibuti').length);
console.log('🍎 Local Fruits:', PRODUCTS.filter(p => p.category === 'Local Fruits').length);