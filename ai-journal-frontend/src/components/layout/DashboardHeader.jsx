// src/components/layout/DashboardHeader.jsx
// src/components/layout/DashboardHeader.jsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const profileButtonDesktopRef = useRef(null);
  const profileButtonMobileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handlePointerDown = (event) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      const clickedInsideMenu = dropdownRef.current && path.includes(dropdownRef.current);
      const clickedProfileButton =
        (profileButtonDesktopRef.current && path.includes(profileButtonDesktopRef.current)) ||
        (profileButtonMobileRef.current && path.includes(profileButtonMobileRef.current));

      if (clickedInsideMenu || clickedProfileButton) return;
      setIsDropdownOpen(false);
    };

    // Capture phase makes this reliable even with overlays/z-index issues.
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [isDropdownOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLogoutConfirmOpen(false);
      }
    };

    if (isLogoutConfirmOpen) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [isLogoutConfirmOpen]);

  const openLogoutConfirm = () => {
    console.log("DashboardHeader: Logout button clicked (open confirm)");
    setIsDropdownOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
    console.log("DashboardHeader: Confirming logout...");
    logout();
    setIsLogoutConfirmOpen(false);
    navigate("/auth", { replace: true });
  };

  const toggleDropdown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });

    setIsDropdownOpen((v) => !v);
  };

  return (
    <>
      {/* Desktop */}
      <header className="hidden md:flex justify-between items-center w-full px-8 py-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg text-primary font-label-caps tracking-widest uppercase text-xs z-50 fixed top-0 left-0 right-0 border-b border-outline-variant/10 dark:border-outline-variant/30 shadow-lg">
        <div
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold tracking-tight text-primary cursor-pointer hover:opacity-70 transition-opacity duration-300"
        >
          Aura Journal
        </div>
        <div className="flex gap-4 text-primary relative">
          <button 
            type="button"
            ref={profileButtonDesktopRef}
            onClick={toggleDropdown}
            className="hover:opacity-70 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Mobile */}
      <header className="flex md:hidden justify-between items-center w-full px-8 py-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-lg text-primary z-50 fixed top-0 left-0 right-0 border-b border-outline-variant/10 dark:border-outline-variant/30 shadow-lg">
        <div
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold tracking-tight font-display cursor-pointer"
        >
          Aura Journal
        </div>
        <div className="flex gap-4 relative">
          <button 
            type="button"
            ref={profileButtonMobileRef}
            onClick={toggleDropdown}
            className="hover:opacity-70 transition-opacity duration-300"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed bg-surface-light dark:bg-surface-dark border border-outline-variant/20 rounded-lg shadow-lg py-2 min-w-[150px] z-60"
          style={{ top: dropdownPos.top, right: dropdownPos.right }}
        >
          <button
            type="button"
            onClick={openLogoutConfirm}
            className="w-full text-left px-4 py-2 text-sm text-on-surface hover:bg-surface-variant dark:hover:bg-surface-variant/10 transition-colors duration-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      )}

      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-9999">
          <button
            type="button"
            aria-label="Close logout confirmation"
            onClick={() => setIsLogoutConfirmOpen(false)}
            className="absolute inset-0 w-full h-full bg-black/50"
          />

          <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="w-full max-w-sm rounded-2xl border border-outline-variant/20 bg-surface-light dark:bg-surface-dark shadow-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">logout</span>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-on-surface">Log out?</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    You’ll need to sign in again to access your journal.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="px-4 py-2 rounded-full text-sm font-semibold border border-outline-variant/30 text-on-surface hover:bg-surface-variant/40 dark:hover:bg-surface-variant/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmLogout}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-on-primary hover:opacity-90 transition-opacity"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}