import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2-xHyoJ-s4g9xzJ-ZqXUwvI1xv1Uqcrg",
  authDomain: "chatapp-mobdev.firebaseapp.com",
  projectId: "chatapp-mobdev",
  storageBucket: "chatapp-mobdev.appspot.com",
  messagingSenderId: "276969214286",
  appId: "1:276969214286:web:2bce482d9b18457f4d4e1f",
  measurementId: "G-BVP0DZVNJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
