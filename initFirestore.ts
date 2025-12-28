import { firestoreService } from './services/firestore';

// Initial products data
const initialProducts = [
  {
    name: "Timur (Sichuan Pepper)",
    nepaliName: "टिमुर",
    category: "Herbs",
    price: 800,
    description: "Aromatic spice with unique numbing sensation, harvested from high altitude regions.",
    benefits: "Aids digestion, reduces inflammation, antimicrobial properties.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"
  },
  {
    name: "Sugandhawal (Siltimur)",
    nepaliName: "सुगन्धवाल",
    category: "Herbs", 
    price: 550,
    description: "Aromatic herb found in temperate Himalayas, known for its distinct earthy fragrance.",
    benefits: "Used in treating nerve disorders and digestive issues.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"
  },
  {
    name: "Jumla Apple (Organic)",
    nepaliName: "जुम्लाको स्याउ",
    category: "Local Fruits",
    price: 250,
    description: "Sweet and crunchy apples grown in the organic orchards of Jumla.",
    benefits: "High fiber, vitamins, and minerals. 100% Organic.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
  }
];

// Initial hero slides
const initialSlides = [
  {
    title: "Authentic Himalayan Herbs",
    subtitle: "Discover the healing power of traditional Nepali Jadibuti sourced directly from the mountains",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=600&fit=crop",
    buttonText: "Shop Herbs",
    buttonLink: "/products",
    isActive: true,
    order: 1
  }
];

export const initializeFirestore = async () => {
  try {
    console.log('Initializing Firestore with sample data...');
    
    // Add products
    for (const product of initialProducts) {
      await firestoreService.addProduct(product);
    }
    
    // Add hero slides
    for (const slide of initialSlides) {
      await firestoreService.addHeroSlide(slide);
    }
    
    console.log('Firestore initialized successfully!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
};