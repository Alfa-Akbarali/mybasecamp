import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZgbm2KY6vXVslx_kZxlkSkvMTxdgP9W8",
  authDomain: "mybasecamp-2f5b8.firebaseapp.com",
  projectId: "mybasecamp-2f5b8",
  storageBucket: "mybasecamp-2f5b8.appspot.com",
  messagingSenderId: "564985549012",
  appId: "1:564985549012:web:e736c99ae9aa18d9a72b41"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db}; 