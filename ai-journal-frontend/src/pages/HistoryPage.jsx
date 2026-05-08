// src/pages/HistoryPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ALL_ENTRIES = [
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
  {
    emoji:     "☀️",
    timestamp: "Oct 22, 8:00 AM",
    score:     7,
    preview:   "Started the day with a morning walk. Feeling grounded.",
  },
  {
    emoji:     "🌫️",
    timestamp: "Oct 21, 6:45 PM",
    score:     5,
    preview:   "Foggy headspace today. Hard to concentrate.",
  },
  {
    emoji:     "🔥",
    timestamp: "Oct 20, 3:00 PM",
    score:     10,
    preview:   "Incredibly productive. Everything clicked today.",
  },
  {
    emoji:     "🌿",
    timestamp: "Oct 19, 9:30 PM",
    score:     7,
    preview:   "Relaxed evening. Journaled and stretched before bed.",
  },
];

const PAGE_SIZE = 4;

const FILTERS = ["All Time", "Past 7 Days", "Past Month", "Past 3 Months"];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);

  const currentFilter = FILTERS[filterIndex];

  const handleFilterCycle = () => {
    setFilterIndex((prev) => (prev + 1) % FILTERS.length);
  };

  const handleShowLess = () => {
    setVisibleCount(PAGE_SIZE);   
  };

  const visibleEntries = ALL_ENTRIES.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_ENTRIES.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, ALL_ENTRIES.length));
  };

  return (
    <div 
      className="text-on-surface font-body-md antialiased min-h-screen relative flex flex-col items-center pb-32 overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
    >

      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      <main className="w-full max-w-3xl mx-auto px-4 md:px-12 pt-32 pb-32 flex flex-col gap-8 flex-grow z-10">

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
          <button
            onClick={handleFilterCycle}
            className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-primary font-label-sm text-[13px] border-primary/10 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            {currentFilter}
          </button>
        </div>

        {/* Entry list */}
        <section className="flex flex-col gap-4">
          {/* Section header with collapse toggle */}
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] font-medium text-on-surface-variant tracking-wide">
              Entries
            </h2> 
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1 text-primary text-[13px] font-medium hover:opacity-70 transition-opacity duration-200"
            >
              {isCollapsed ? "Show" : "Hide"}
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${
                  isCollapsed ? "rotate-0" : "rotate-180"
                }`}
              >
                expand_more
              </span>
            </button>
          </div>

          {/* Collapsible content */}
          <div
            className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
              isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
            }`}
          >
            {visibleEntries.map((entry) => (
              <EntryRow key={entry.timestamp} {...entry} />
            ))}

            <div className="flex items-center justify-center gap-3 mt-4">
            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 rounded-full border border-primary/20 text-primary font-['Manrope'] font-normal text-base leading-6 tracking-normal hover:bg-primary/5 transition-colors"
              >
                Load More
              </button>
            )}

            {visibleCount > PAGE_SIZE && (
              <button
                onClick={handleShowLess}
                className="px-6 py-2 rounded-full border border-primary/20 text-primary font-['Manrope'] font-normal text-base leading-6 tracking-normal hover:bg-primary/5 transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
          </div>
        </section>
      </main>

      <BottomNav activePage="history" onNavigate={navigate} />
    </div>
  );
}