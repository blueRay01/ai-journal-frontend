// src/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";
import StreakCard from "../components/dashboard/StreakCard";
import EnergyFlowCard from "../components/dashboard/EnergyFlowCard";
import ActiveFocusCard from "../components/dashboard/ActiveFocusCard";
import ResonanceTrackerCard from "../components/dashboard/ResonanceTrackerCard";
import TimelineProgressionCard from "../components/dashboard/TimelineProgressionCard";
import BottomNav from "../components/layout/BottomNav";
import DashboardHeader from "../components/layout/DashboardHeader";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative overflow-x-hidden pb-[120px]"
      style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
    >
      {/* Ambient background layers */}
      <div className="absolute top-0 left-[calc(50%-600px)] w-[1200px] h-[500px] z-0 bg-[#d7e8c7] rounded-full blur-[80px] opacity-50 pointer-events-none" />
      <div className="absolute w-[50%] h-[50%] top-[60%] left-[-20%] z-0 bg-[#e7deff] rounded-full blur-[60px] opacity-15 pointer-events-none" />
      <div className="absolute w-[60%] h-[60%] top-[-20%] left-[50%] z-0 bg-[#c9ebcd] rounded-full blur-[60px] opacity-25 pointer-events-none" />

      {/* Header */}
      <DashboardHeader />

      {/* Main */}
      <main className="relative z-10 max-w-[960px] mx-auto px-4 md:px-8 pt-[88px] pb-8 flex flex-col gap-6">

        {/* Greeting */}
        <div className="mb-2">
          <h1 className="font-display text-[42px] md:text-[52px] font-light leading-tight tracking-tight text-[#2a3a2a]">
            Good Morning, Alex.
          </h1>
          <p className="text-[16px] text-[#6a7a6a] mt-2 leading-relaxed">
            Take a moment to center yourself today.
          </p>
        </div>

        {/* Bento grid — 12 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

          {/* ── LEFT COLUMN (col-span-7) ── */}
          <div className="md:col-span-7 flex flex-col gap-4">

            {/* Row 1: Energy Flow chart */}
            <EnergyFlowCard />

            {/* Row 2: Streak + Active Focus side by side */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <StreakCard />
              </div>
              <div className="col-span-8">
                <ActiveFocusCard />
              </div>
            </div>

            {/* Row 3: Resonance Tracker */}
            <ResonanceTrackerCard />

            {/* Row 4: Check in CTA */}
            <button
              onClick={() => navigate("/checkin")}
              className="w-full bg-[#2f4a35] text-white text-sm font-medium py-4 rounded-xl hover:bg-[#253d2a] transition-all shadow-[0_4px_20px_rgba(47,74,53,0.25)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Check in today
            </button>
          </div>

          {/* ── RIGHT COLUMN (col-span-5) ── */}
          <div className="md:col-span-5">
            <TimelineProgressionCard />
          </div>

        </div>
      </main>

      <BottomNav activePage="home" onNavigate={navigate} />
    </div>
  );
}
