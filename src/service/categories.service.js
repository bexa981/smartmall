import { db as database } from '../firebaseConfig'
import { collection } from "firebase/firestore"; 
import { getFirebaseDocs } from '../utils';

const categoriesCollection = collection(database, 'categories')

export async function getCategories() {
    const categories = await getFirebaseDocs(categoriesCollection);
    for(let category of categories) {
        const subCategoriesCollection = collection(database, `categories/${category.id}/subCategories`);
        const subCategories = await getFirebaseDocs(subCategoriesCollection);
        category.name = category.id
        category.subCategories = subCategories;
    }
    return Promise.resolve(categories)
}