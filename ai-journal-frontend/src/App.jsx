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
import { useState, useEffect, useRef } from "react";

// Navigation order for directional animations
const NAVIGATION_ORDER = ['/dashboard', '/checkin', '/insights', '/history', '/report'];

function getNavigationDirection(from, to) {
  const fromIndex = NAVIGATION_ORDER.indexOf(from);
  const toIndex = NAVIGATION_ORDER.indexOf(to);
  
  if (fromIndex === -1 || toIndex === -1) return 'fade';
  return toIndex > fromIndex ? 'right' : 'left';
}

function FadeTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState('fade');
  const location = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    const prevPath = prevLocationRef.current.pathname;
    const currentPath = location.pathname;
    
    // Determine direction
    const navDirection = getNavigationDirection(prevPath, currentPath);
    setDirection(navDirection);
    
    // Fade out
    setIsVisible(false);
    
    // Fade in with new direction
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    prevLocationRef.current = location;
    return () => clearTimeout(timer);
  }, [location]);

  const getAnimationClasses = () => {
    if (!isVisible) {
      // Fade out animation
      switch (direction) {
        case 'right':
          return 'opacity-0 translate-x-8';
        case 'left':
          return 'opacity-0 -translate-x-8';
        default:
          return 'opacity-0';
      }
    } else {
      // Fade in animation
      switch (direction) {
        case 'right':
          return 'opacity-100 translate-x-0';
        case 'left':
          return 'opacity-100 -translate-x-0';
        default:
          return 'opacity-100';
      }
    }
  };

  return (
    <div 
      className={`transition-all duration-500 ease-in-out ${getAnimationClasses()}`}
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