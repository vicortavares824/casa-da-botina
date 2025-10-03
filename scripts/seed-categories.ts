import { db } from '../lib/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

const categories = [
  { label: 'Botas Masculinas', value: 'botas-masculinas' },
  { label: 'Botas Femininas', value: 'botas-femininas' },
  { label: 'Botas Infantis', value: 'botas-infantis' },
  { label: 'Chapéus', value: 'chapeus' },
  { label: 'Bonés', value: 'bones' },
];

async function seedCategories() {
  for (const category of categories) {
    const ref = doc(collection(db, 'categories'), category.value);
    await setDoc(ref, category);
    console.log(`Categoria ${category.label} adicionada!`);
  }
  console.log('Categorias inseridas com sucesso!');
}

seedCategories().catch(console.error);
