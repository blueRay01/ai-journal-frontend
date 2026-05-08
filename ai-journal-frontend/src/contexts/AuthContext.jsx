// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase"; // We need to create this file next!
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  // Firebase automatically checks for existing sessions
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");
    
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    setAuthReady(true);
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    console.log("Logout function called - clearing auth state");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    console.log("Logout completed - auth state cleared");
  };

  const value = {
    authReady,
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}