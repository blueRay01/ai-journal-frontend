// src/pages/HistoryPage.jsx
import DashboardPage from "./DashboardPage";
import BottomNav from "../components/layout/BottomNav";
import MiniChartCard from "../components/dashboard/MiniChartCard";
import EntryRow from "../components/dashboard/EntryRow";
import DashboardHeader from "../components/layout/DashboardHeader";

const CHART_POINTS = [
  { day: "M", mbClass: "mb-[10px]", isToday: false },
  { day: "T", mbClass: "mb-[60px]", isToday: false },
  { day: "W", mbClass: "mb-[30px]", isToday: false },
  { day: "T", mbClass: "mb-[45px]", isToday: false },
  { day: "F", mbClass: "mb-[15px]", isToday: false },
  { day: "S", mbClass: "mb-[50px]", isToday: false },
  { day: "S", mbClass: "mb-[20px]", isToday: true  },
];

const LOG_ENTRIES = [
  {
    emoji:     "🌤️",
    timestamp: "Today, 9:00 AM",
    score:     8,
    preview:   "Feeling rested and ready to tackle the new project tasks.",
  },
  {
    emoji:     "🌧️",
    timestamp: "Yesterday, 8:30 PM",
    score:     4,
    preview:   "A bit drained after back-to-back meetings. Need to unplug.",
  },
  {
    emoji:     "⚡",
    timestamp: "Oct 24, 2:15 PM",
    score:     9,
    preview:   "High energy block. Finished the design system draft.",
  },
  {
    emoji:     "🌙",
    timestamp: "Oct 23, 10:00 PM",
    score:     6,
    preview:   "Calm evening reading. Winding down slowly.",
  },
];

export default function HistoryPage({ onNavigate }) {
  return (
    <div className="text-on-surface font-body-md antialiased min-h-screen relative flex flex-col items-center pb-32 overflow-x-hidden">

      {/* Page-specific background auras */}
      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      <main className="w-full max-w-3xl mx-auto px-4 md:px-12 flex flex-col gap-8 flex-grow z-10 pt-4">

        {/* Page heading + filter */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary">
              Log History
            </h1>
            <p className="text-[16px] text-on-surface-variant mt-2 leading-relaxed">
              Your archival record of mood and energy.
            </p>
          </div>
          <button className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-primary font-label-sm text-[13px] hover:bg-surface-variant transition-colors border-primary/10">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            All Time
          </button>
        </div>

        {/* Trend chart */}
        <MiniChartCard
          title="Energy Flow"
          label="Past 7 Days"
          points={CHART_POINTS}
          variant="area"
        />

        {/* Entry list */}
        <section className="flex flex-col gap-4">
          {LOG_ENTRIES.map((entry) => (
            <EntryRow key={entry.timestamp} {...entry} />
          ))}

          <button className="mx-auto mt-4 px-6 py-2 rounded-full border border-primary/20 text-primary font-label-sm text-[13px] hover:bg-primary/5 transition-colors">
            Load More
          </button>
        </section>
      </main>

      <BottomNav activePage="history" onNavigate={onNavigate} />
    </div>
  );
}