// src/components/layout/DashboardHeader.jsx
// src/components/layout/DashboardHeader.jsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    // In a real app, this would handle logout logic
    navigate('/auth');
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Desktop */}
      <header className="hidden md:flex justify-between items-center w-full px-8 py-6 bg-transparent text-primary font-label-caps tracking-widest uppercase text-xs z-40 relative">
        <div
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold tracking-tight text-primary cursor-pointer hover:opacity-70 transition-opacity duration-300"
        >
          Aura Journal
        </div>
        <div className="flex gap-4 text-primary relative">
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
      </header>

      {/* Mobile */}
      <header className="flex md:hidden justify-between items-center w-full px-8 py-6 bg-transparent text-primary z-40 relative">
        <div
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold tracking-tight font-display cursor-pointer"
        >
          Aura Journal
        </div>
        <div className="flex gap-4 relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hover:opacity-70 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          
          {/* Mobile Dropdown Menu */}
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
      </header>
    </>
  );
}