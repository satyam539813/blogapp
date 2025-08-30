// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdzDBuej8cEpFKJ8WUodvy33rrBLEoW7w",
    authDomain: "blog-15e8d.firebaseapp.com",
    projectId: "blog-15e8d",
    storageBucket: "blog-15e8d.appspot.com",
    messagingSenderId: "554185041335",
    appId: "1:554185041335:web:e80468394ee8ab42933432",
    measurementId: "G-18LNWKBCZW"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services for use in other components
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
