// src/pages/DashboardPage.jsx
import StreakCard from "../dashboard/StreakCard";
import EnergyFlowCard from "../dashboard/EnergyFlowCard";
import RecentEntryCard from "../dashboard/RecentEntryCard";
import BottomNav from "../layout/BottomNav";

const RECENT_ENTRIES = [
  {
    date: "Yesterday",
    mood: "Peaceful",
    icon: "self_improvement",
    iconBg: "bg-primary-container/20",
    iconColor: "text-primary",
  },
  {
    date: "Oct 24",
    mood: "Focused",
    icon: "psychology",
    iconBg: "bg-secondary-container/30",
    iconColor: "text-secondary",
  },
];

export default function DashboardPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden pb-[120px]">

      {/* Ambient gradients — mirrors the HTML prototype */}
      <div className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary-fixed opacity-30 blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-20%] w-[50%] h-[50%] rounded-full bg-secondary-fixed opacity-20 blur-[80px] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-grain pointer-events-none -z-10" />

      {/* Top App Bar — Desktop */}
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

      {/* Top App Bar — Mobile */}
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

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col gap-6">

        {/* Greeting */}
        <div className="mb-4">
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-on-surface">
            Good Morning, Alex.
          </h1>
          <p className="text-[18px] text-on-surface-variant mt-2 leading-relaxed">
            Take a moment to center yourself today.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <StreakCard />
          <EnergyFlowCard />

          {/* Primary CTA */}
          <div className="md:col-span-12 flex justify-center py-4">
            <button className="bg-primary text-on-primary font-label-caps px-8 py-4 rounded-full hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(39,68,47,0.2)] flex items-center gap-2 tracking-widest uppercase text-xs">
              <span className="material-symbols-outlined text-lg">add</span>
              Check in today
            </button>
          </div>

          {/* Recent entries */}
          {RECENT_ENTRIES.map((entry) => (
            <RecentEntryCard key={entry.date} {...entry} />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}