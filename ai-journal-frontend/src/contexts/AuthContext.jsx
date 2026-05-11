// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase"; 
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updatePassword 
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
  const [isAdmin, setIsAdmin] = useState(false);

  // Firebase automatically checks for existing sessions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticated(!!currentUser); 
      setLoading(false); 
    });

    return unsubscribe; 
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // This is the function your page was begging for!
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const changePassword = (newPassword) => {
    if (!user) {
      throw new Error("No user is currently signed in");
    }
    return updatePassword(user, newPassword);
  };

  const adminLogin = () => {
    const adminUser = {
      uid: 'admin',
      email: 'admin@test.com',
      displayName: 'Admin User'
    };
    setUser(adminUser);
    setIsAuthenticated(true);
    setIsAdmin(true);
    setLoading(false);
  };

  const adminLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    isAuthenticated,
    user,
    isAdmin,
    login,
    signup, 
    logout,
    changePassword,
    adminLogin,
    adminLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}