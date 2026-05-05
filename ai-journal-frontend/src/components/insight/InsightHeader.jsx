// src/components/insight/InsightHeader.jsx

export default function InsightHeader() {
  return (
    <header className="flex justify-between items-center w-full px-8 py-6 bg-transparent flat no shadows docked full-width top-0 z-40 max-w-container-max relative">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-emerald-900 tracking-tight font-display text-primary drop-shadow-sm">
          Aura Journal
        </span>
      </div>
      <div className="flex items-center gap-4 text-emerald-900">
        <button className="hover:opacity-70 transition-opacity ease-in-out duration-300 drop-shadow-sm">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            settings
          </span>
        </button>
        <button className="hover:opacity-70 transition-opacity ease-in-out duration-300 drop-shadow-sm">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
            account_circle
          </span>
        </button>
      </div>
    </header>
  );
}