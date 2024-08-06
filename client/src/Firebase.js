// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blog-ce6c3.firebaseapp.com",
  projectId: "blog-ce6c3",
  storageBucket: "blog-ce6c3.appspot.com",
  messagingSenderId: "391201778512",
  appId: "1:391201778512:web:3776bb630373a4855ada55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
