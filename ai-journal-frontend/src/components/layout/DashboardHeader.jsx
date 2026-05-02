// src/components/layout/DashboardHeader.jsx

export default function DashboardHeader() {
  return (
    <>
      {/* Desktop */}
      <header className="hidden md:flex justify-between items-center w-full px-8 py-6 bg-transparent text-primary font-label-caps tracking-widest uppercase text-xs z-40 relative">
        <div className="text-xl font-bold tracking-tight text-primary">Aura Journal</div>
        <div className="flex gap-4 text-primary">
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Mobile */}
      <header className="flex md:hidden justify-between items-center w-full px-8 py-6 bg-transparent text-primary z-40 relative">
        <div className="text-xl font-bold tracking-tight font-display">Aura Journal</div>
        <div className="flex gap-4">
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="hover:opacity-70 transition-opacity duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>
    </>
  );
}