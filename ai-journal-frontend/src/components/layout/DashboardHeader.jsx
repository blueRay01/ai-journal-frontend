// src/components/layout/DashboardHeader.jsx
// src/components/layout/DashboardHeader.jsx
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const navigate = useNavigate();

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
        <div className="flex gap-4 text-primary">
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
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
        <div className="flex gap-4">
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>
    </>
  );
}