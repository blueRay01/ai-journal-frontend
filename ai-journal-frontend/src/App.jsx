// src/App.jsx
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import AuthPage from "./components/pages/AuthPage";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" | "auth"

  if (page === "auth") {
    return <AuthPage onBack={() => setPage("landing")} />;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-200 font-body relative overflow-x-hidden min-h-screen">
      <div className="texture-overlay bg-paper-texture" />
      <div className="fixed inset-0 bg-aura-gradient dark:bg-aura-gradient-dark pointer-events-none -z-10" />

      <Navbar onSignIn={() => setPage("auth")} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <HeroSection onBeginWriting={() => setPage("auth")} />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}