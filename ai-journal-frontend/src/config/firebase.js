import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these dummy values with the keys your classmate gives you!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize the Firebase connection
const app = initializeApp(firebaseConfig);

// Export the auth service so your AuthContext can use it
export const auth = getAuth(app);