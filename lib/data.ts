import { db } from './firebase';
import { collection, getDocs, query, where, limit, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

// Define um tipo para o produto para melhor segurança de tipo
// Certifique-se de que corresponde à estrutura do seu documento no Firestore
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  badge?: string | null;
}

export interface Category {
  id: string;
  label: string;
  value: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const productsCollection = collection(db, 'produtos');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    return productsList;
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const productsRef = collection(db, 'produtos');
  const q = query(productsRef, where('badge', '==', 'Destaque'), limit(4));
  const querySnapshot = await getDocs(q);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  return products;
}

export async function addProduct(productData: Omit<Product, 'id'>): Promise<string> {
  try {
    console.log("Tentando adicionar produto:", productData);
    const docRef = await addDoc(collection(db, "produtos"), productData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    if (e instanceof Error) throw new Error(e.message);
    throw new Error("Failed to add product");
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    return categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error("Erro ao buscar categorias: ", error);
    return [];
  }
}

export async function ensureDefaultCategories() {
  const defaultCategories = [
    { label: 'Botas Masculinas', value: 'botas-masculinas' },
    { label: 'Botas Femininas', value: 'botas-femininas' },
    { label: 'Botas Infantis', value: 'botas-infantis' },
    { label: 'Chapéus', value: 'chapeus' },
    { label: 'Bonés', value: 'bones' },
  ];
  const existing = await fetchCategories();
  if (existing.length === 0) {
    for (const cat of defaultCategories) {
      await setDoc(doc(collection(db, 'categories'), cat.value), cat);
    }
    console.log('Categorias padrão inseridas no Firestore.');
  }
}

export async function fetchProductById(id: string) {
  try {
    const ref = doc(db, 'produtos', id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      // Garante que sempre exista um array images
      let images: string[] = [];
      if (Array.isArray(data.images)) {
        images = data.images;
      } else if (typeof data.image === 'string' && data.image.length > 0) {
        images = [data.image];
      }
      return { id: snap.id, ...data, images };
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar produto por id:', error);
    return null;
  }
}
