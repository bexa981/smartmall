import { db as database } from '../firebaseConfig'
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"; 
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

export async function addSubCategory(categoryId, subCategoryName) {
    const subCategoriesCollection = collection(database, `categories/${categoryId}/subCategories`);
    const result = await addDoc(subCategoriesCollection, { name: subCategoryName });
    return result
}

export async function deleteSubCategory(categoryId, subCategoryId) {
    const result = await deleteDoc(doc(database, 'categories', categoryId, 'subCategories', subCategoryId));
    return result
}