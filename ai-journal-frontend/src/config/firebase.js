import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH4RwanFNrbNSIxAPzhNKg6ZTJHGN0BmQ",
  authDomain: "aura-journal-845eb.firebaseapp.com",
  projectId: "aura-journal-845eb",
  storageBucket: "aura-journal-845eb.firebasestorage.app",
  messagingSenderId: "564242605861",
  appId: "1:564242605861:web:9637d4b371a066fbaedccc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
