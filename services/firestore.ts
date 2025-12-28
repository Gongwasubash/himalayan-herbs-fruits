import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { db, auth } from '../firebase';

export const firestoreService = {
  // PRODUCTS
  async getProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addProduct(product: any) {
    const docRef = await addDoc(collection(db, 'products'), product);
    return { id: docRef.id, ...product };
  },

  async updateProduct(id: string, updates: any) {
    await updateDoc(doc(db, 'products', id), updates);
    return { id, ...updates };
  },

  async deleteProduct(id: string) {
    await deleteDoc(doc(db, 'products', id));
  },

  // USERS
  async registerUser(email: string, password: string, userData: any) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, 'users'), {
      uid: userCredential.user.uid,
      ...userData,
      createdAt: new Date()
    });
    return userCredential.user;
  },

  async loginUser(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async logoutUser() {
    await signOut(auth);
  },

  // ORDERS
  async createOrder(orderData: any) {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    });
    return { id: docRef.id, ...orderData };
  },

  async getUserOrders(userId: string) {
    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // HERO SLIDES
  async getHeroSlides() {
    const querySnapshot = await getDocs(collection(db, 'heroSlides'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addHeroSlide(slide: any) {
    const docRef = await addDoc(collection(db, 'heroSlides'), slide);
    return { id: docRef.id, ...slide };
  },

  async updateHeroSlide(id: string, updates: any) {
    await updateDoc(doc(db, 'heroSlides', id), updates);
    return { id, ...updates };
  },

  async deleteHeroSlide(id: string) {
    await deleteDoc(doc(db, 'heroSlides', id));
  }
};