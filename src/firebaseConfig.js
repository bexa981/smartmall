// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbBZAYppYtRcE-J5cpvyXVlS-fOl0zKng",
    authDomain: "smartmalluz.firebaseapp.com",
    projectId: "smartmalluz",
    storageBucket: "smartmalluz.appspot.com",
    messagingSenderId: "378050316951",
    appId: "1:378050316951:web:a5698bd0308bfd444af7d2",
    measurementId: "G-WWZ888C7QN"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Services
// const auth = getAuth(firebaseApp);
// const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); 

export { db,storage };
