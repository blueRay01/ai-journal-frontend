// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Avoid redirecting before auth is loaded on refresh
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
