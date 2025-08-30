import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const blogCollection = collection(db, "blogs");

// Add blog
export const addBlog = async (blog) => {
    await addDoc(blogCollection, blog);
};

// Get all blogs
export const getBlogs = async () => {
    const snapshot = await getDocs(blogCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete blog
export const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
};

// Update blog (e.g., rating)
export const updateBlog = async (id, updatedFields) => {
    await updateDoc(doc(db, "blogs", id), updatedFields);
};
