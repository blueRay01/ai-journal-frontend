// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin, isAuthenticated, isAdmin } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple admin credentials check
    if (credentials.email === "admin" && credentials.password === "admin123") {
      adminLogin();
      navigate("/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  if (isAuthenticated && isAdmin) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f5e] to-[#27442f] p-4">
      <DashboardHeader />
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#27442f]">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#27442f] mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#27442f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#27442f] focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#27442f] mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-3 py-2 border border-[#27442f] rounded-md focus:outline-none focus:ring-2 focus:ring-[#27442f] focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#27442f] text-white py-2 px-4 rounded-md hover:bg-[#1e293b] transition-colors"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
