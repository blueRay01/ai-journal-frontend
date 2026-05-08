// src/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";
import StreakCard from "../components/dashboard/StreakCard";
import EnergyFlowCard from "../components/dashboard/EnergyFlowCard";
import RecentEntryCard from "../components/dashboard/RecentEntryCard";
import BottomNav from "../components/layout/BottomNav";
import DashboardHeader from "../components/layout/DashboardHeader";

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
  const navigate = useNavigate();
  return (
    <div className="text-on-surface font-body-md min-h-screen relative overflow-x-hidden pb-[120px]">

      {/* Ambient gradients — mirrors the HTML prototype */}
      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 flex flex-col gap-6">

        {/* Greeting */}
        <div className="mb-4">
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary">
            Good Morning, Pasarpls.
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
            <button 
            onClick={() => navigate('/checkin')}
            className="bg-primary text-on-primary font-['Manrope'] font-normal text-base leading-6 tracking-normal px-8 py-4 rounded-full hover:bg-primary/90 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-2"
          >
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

      <BottomNav activePage="home" onNavigate={navigate} />
    </div>
  );
}