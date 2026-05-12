// src/components/layout/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if current page should show profile icon (not landing page)
  const shouldShowProfileIcon = location.pathname !== '/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Navbar: Logout button clicked");
    console.log("Navbar: Calling logout function...");
    logout();
    setIsDropdownOpen(false);
    console.log("Navbar: Logout completed, dropdown closed");
    navigate("/auth", { replace: true });
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
      <div className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3 rounded-full shadow-paper dark:shadow-paper-dark border border-secondary/20 dark:border-secondary/40 flex items-center space-x-8">
        <button 
          onClick={() => navigate('/')}
          className="font-display font-bold text-xl tracking-tight flex items-center gap-2 text-stone-900 dark:text-white hover:text-primary transition-colors duration-200 bg-transparent border-none cursor-pointer"
        >
          <span className="material-icons text-primary">auto_awesome</span>
          Aura
        </button>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-stone-700 dark:text-stone-300">
          <Link to="/#philosophy" className="hover:text-primary transition-colors duration-200">Philosophy</Link>
          <Link to="/#features" className="hover:text-primary transition-colors duration-200">Features</Link>
          <Link to="/#pricing" className="hover:text-primary transition-colors duration-200">Pricing</Link>
        </div>

        {shouldShowProfileIcon ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute right-0 top-8 bg-surface-light dark:bg-surface-dark border border-outline-variant/20 rounded-lg shadow-lg py-2 min-w-[150px] z-50"
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-variant dark:hover:bg-surface-variant/10 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary dark:hover:bg-stone-200 transition-colors duration-200"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}