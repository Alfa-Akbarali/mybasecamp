import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDITxJ8F6LtYQgbw65uX9Y4ZHJOR5g-JDw",
  authDomain: "myinstagram-e939b.firebaseapp.com",
  projectId: "myinstagram-e939b",
  storageBucket: "myinstagram-e939b.appspot.com",
  messagingSenderId: "700619809059",
  appId: "1:700619809059:web:ada818673a9c461957ec96",
  measurementId: "G-BS7TYK0ZLY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const storage = firebase.storage()
const db = firebaseApp.firestore()
export { auth, db, storage }