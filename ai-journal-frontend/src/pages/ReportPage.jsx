// src/pages/ReportPage.jsx
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";
import StreakRingCard from "../components/report/StreakRingCard";
import PeakResonanceCard from "../components/report/PeakResonanceCard";
import HighFrictionCard from "../components/report/HighFrictionCard";
import CorrelationCard from "../components/report/CorrelationCard";
import FocusCard from "../components/report/FocusCard";

export default function ReportPage({ onNavigate }) {
  return (
    <div className="text-on-surface font-body-md min-h-screen relative overflow-x-hidden pb-32 antialiased">

      {/* Background — same as Dashboard & History */}
      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      {/* Ambient glow behind header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary-fixed/50 rounded-full blur-[140px] -z-10 pointer-events-none" />

      <main className="w-full max-w-2xl mx-auto px-6 pt-8 pb-24 flex flex-col gap-8 relative z-10">

        {/* Page header */}
        <header className="flex flex-col items-center text-center mb-4">
          <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 mb-6">
            <span
              className="material-symbols-outlined text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="font-label-caps text-xs tracking-widest uppercase font-bold text-primary-container">
              Zen State Achieved
            </span>
          </div>
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary mb-2">
            Weekly Synthesis
            </h1>
          <p className="text-[18px] text-outline leading-relaxed">Oct 16 - Oct 22, 2023</p>
        </header>

        <StreakRingCard days={5} label="Consistent clarity" />
        <PeakResonanceCard day="Tuesday" description="Deep focus and high energy reported post-meditation." />
        <HighFrictionCard day="Thursday" description="Elevated stress levels linked to disrupted sleep schedule." />
        <CorrelationCard />
        <FocusCard />
      </main>

      <BottomNav activePage="report" onNavigate={onNavigate} />
    </div>
  );
}