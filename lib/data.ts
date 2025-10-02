import { db } from './firebase';
import { collection, getDocs, query, where, limit, addDoc } from 'firebase/firestore';

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
    const docRef = await addDoc(collection(db, "produtos"), productData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add product");
  }
}

// Você pode adicionar mais funções aqui para buscar categorias, depoimentos, etc.
// Exemplo:
// export async function fetchCategories() { ... }
// export async function fetchTestimonials() { ... }
