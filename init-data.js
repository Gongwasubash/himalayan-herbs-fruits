// Run this in browser console after enabling Firestore
import { firestoreService } from './services/firestore.js';

// Sample products
const products = [
  {
    name: "Timur (Sichuan Pepper)",
    nepaliName: "टिमुर",
    category: "Herbs",
    price: 800,
    description: "Aromatic spice with unique numbing sensation",
    benefits: "Aids digestion, reduces inflammation",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"
  },
  {
    name: "Jumla Apple (Organic)",
    nepaliName: "जुम्लाको स्याउ", 
    category: "Local Fruits",
    price: 250,
    description: "Sweet and crunchy organic apples",
    benefits: "High fiber, vitamins, minerals",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
  }
];

// Add products to Firestore
products.forEach(async (product) => {
  await firestoreService.addProduct(product);
  console.log('Added:', product.name);
});