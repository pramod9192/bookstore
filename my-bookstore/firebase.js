// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Ensure your environment variables are set correctly
// process.env.EXPO_PUBLIC_FIREBASE_API_KEY should be available in your build environment

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6XSY8_BdO2XO5clCCzhbvtSxGN3xg2d4", // This should be set in your environment
  authDomain: "petshop-45617.firebaseapp.com",
  projectId: "petshop-45617",
  storageBucket: "petshop-45617.firebasestorage.app",
  messagingSenderId: "147582830071",
  appId: "1:147582830071:web:b15c60a96888a74a57daf2",
  measurementId: "G-1N0ST2PSCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
export const storage=getStorage(app);

// If you want to use Firebase Analytics, uncomment this line
// const analytics = getAnalytics(app);
