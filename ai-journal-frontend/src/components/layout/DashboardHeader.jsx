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
    setIsDropdownOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  const confirmLogout = () => {
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
      {/* ── Desktop Header ── */}
      <header
        className="hidden md:flex justify-between items-center w-full px-8 py-6 text-primary font-label-caps tracking-widest uppercase text-xs z-50 fixed top-0 left-0 right-0 backdrop-blur-xl bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.60)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(15,15,20,0.00)_0%,rgba(15,15,20,0.70)_100%)] border-b border-white/20 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        aria-label="Dashboard header"
      >
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold tracking-tight text-primary cursor-pointer hover:opacity-70 transition-opacity duration-300"
        >
          Aura Journal
        </div>
        <div className="flex gap-4 text-primary">
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

      {/* ── Mobile Header ── */}
      <header
        className="flex md:hidden justify-between items-center w-full px-8 py-6 text-primary z-50 fixed top-0 left-0 right-0 backdrop-blur-xl bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.60)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(15,15,20,0.00)_0%,rgba(15,15,20,0.70)_100%)] border-b border-white/20 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        aria-label="Dashboard header"
      >
        <div
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold tracking-tight font-display cursor-pointer"
        >
          Aura Journal
        </div>
        <div className="flex gap-4">
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

      {/* ── Dropdown ── */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed bg-[#f2f2ee] dark:bg-[#1c1c22] border border-black/8 dark:border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] py-2 min-w-[160px] z-[60]"
          style={{ top: dropdownPos.top, right: dropdownPos.right }}
        >
          <button
            type="button"
            aria-label="Account"
            onClick={() => {
              setIsDropdownOpen(false);
              navigate("/account");
            }}
            className="w-full text-left px-4 py-2 text-sm text-[#252729] dark:text-on-surface hover:bg-black/5 dark:hover:bg-white/8 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-6 h-6 shrink-0 text-[#5a7a5a]" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 10c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4m0 2c-2.97 0-6.1 1.46-6.1 2v.1h12.2V20c0-.54-3.13-2-6.1-2" />
            </svg>
            Account
          </button>
          <button
            type="button"
            onClick={openLogoutConfirm}
            className="w-full text-left px-4 py-2 text-sm text-[#2a3a2a] dark:text-on-surface hover:bg-black/5 dark:hover:bg-white/8 transition-colors duration-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-[#5a7a5a]">logout</span>
            Logout
          </button>
        </div>
      )}

      {/* ── Logout Confirm Modal ── */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[9999]">
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
                    You'll need to sign in again to access your journal.
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