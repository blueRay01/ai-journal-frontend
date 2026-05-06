// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import ReportPage from "./pages/ReportPage";
import CheckInPage from "./pages/CheckInPage";
import AIInsightPage from "./pages/AIInsightPage";
import { useState, useEffect } from "react";

function FadeTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div 
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

function LandingPage() {
  return (
    <FadeTransition>
      <div className="bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-200 font-body relative overflow-x-hidden min-h-screen">
        <div className="texture-overlay bg-paper-texture" />
        <div className="fixed inset-0 bg-aura-gradient dark:bg-aura-gradient-dark pointer-events-none -z-10" />

        <Navbar />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <HeroSection />
          <FeaturesSection />
        </main>

        <Footer />
      </div>
    </FadeTransition>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<FadeTransition><AuthPage /></FadeTransition>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <FadeTransition>
                  <DashboardPage />
                </FadeTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <FadeTransition>
                  <HistoryPage />
                </FadeTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/report" 
            element={
              <ProtectedRoute>
                <FadeTransition>
                  <ReportPage />
                </FadeTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkin" 
            element={
              <ProtectedRoute>
                <FadeTransition>
                  <CheckInPage />
                </FadeTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/insights" 
            element={
              <ProtectedRoute>
                <FadeTransition>
                  <AIInsightPage />
                </FadeTransition>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}