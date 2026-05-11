// src/pages/HistoryPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import BottomNav from "../components/layout/BottomNav";
import EntryRow from "../components/dashboard/EntryRow";
import DashboardHeader from "../components/layout/DashboardHeader";
import { getRecordingDate } from "../utils/testDateTime";

const PAGE_SIZE = 4;
const FILTERS = ["All Time", "Past 7 Days", "Past Month", "Past 3 Months"];

const MOOD_SCORES   = { sad: 2, anxious: 4, neutral: 5, positive: 7, happy: 9 };
const SLEEP_SCORES  = { restless: 2, poor: 4, neutral: 5, good: 7, excellent: 9 };
const STRESS_SCORES = { overwhelmed: 1, tense: 3, neutral: 5, moderate: 7, calm: 9 };

function calculateWellnessScore(mood, sleep, stress, exercise) {
  const moodScore    = MOOD_SCORES[mood]    ?? 5;
  const sleepScore   = SLEEP_SCORES[sleep]  ?? 5;
  const stressScore  = STRESS_SCORES[stress] ?? 5;
  const exerciseBonus = exercise ? 0.5 : 0;
  return Math.min(Math.round((moodScore + sleepScore + stressScore) / 3 + exerciseBonus), 10);
}

function formatTimestamp(date) {
  if (!date) return "";
  const now = getRecordingDate(); // Use targeted date/time system
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
  const entryDay = new Date(date); entryDay.setHours(0, 0, 0, 0);
  const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (entryDay.getTime() === today.getTime()) return `Today, ${timeStr}`;
  if (entryDay.getTime() === yesterday.getTime()) return `Yesterday, ${timeStr}`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + `, ${timeStr}`;
}

function getFilterCutoff(filter) {
  const now = new Date();
  if (filter === "Past 7 Days")   { now.setDate(now.getDate() - 7);   return now; }
  if (filter === "Past Month")    { now.setMonth(now.getMonth() - 1); return now; }
  if (filter === "Past 3 Months") { now.setMonth(now.getMonth() - 3); return now; }
  return null;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allEntries, setAllEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0);

  const currentFilter = FILTERS[filterIndex];

  useEffect(() => {
    if (!user) return;
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        const entries = snap.docs.map((docSnap) => {
          const data = docSnap.data();
          const date = data.createdAt?.toDate?.() ?? null;

          // Trust stored summaryScore first; fallback for older entries
          const score = data.summaryScore != null
            ? Number(data.summaryScore)
            : data.mood
              ? calculateWellnessScore(
                  data.mood         || "neutral",
                  data.sleepQuality || "neutral",
                  data.stressLevel  || "neutral",
                  data.exercise     || false
                )
              : null;

          return {
            id:           docSnap.id,
            emoji:        data.summaryEmoji   || "📝",
            timestamp:    formatTimestamp(date),
            rawDate:      date,
            score,
            preview:      data.summaryPreview || data.reflection || "No summary available.",
            mood:         data.mood         || null,
            sleepQuality: data.sleepQuality || null,
            stressLevel:  data.stressLevel  || null,
          };
        });
        setAllEntries(entries);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [user]);

  const filteredEntries = (() => {
    const cutoff = getFilterCutoff(currentFilter);
    if (!cutoff) return allEntries;
    return allEntries.filter((e) => e.rawDate && e.rawDate >= cutoff);
  })();

  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEntries.length;

  const handleFilterCycle = () => {
    setFilterIndex((prev) => (prev + 1) % FILTERS.length);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div
      className="text-on-surface font-body-md antialiased min-h-screen relative flex flex-col items-center pb-32 overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
    >
      <DashboardHeader />

      <main className="w-full max-w-3xl mx-auto px-4 md:px-12 pt-32 pb-32 flex flex-col gap-8 flex-grow z-10">

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
            className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-primary font-label-sm text-[13px] border-primary/10 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            {currentFilter}
          </button>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] font-medium text-on-surface-variant tracking-wide">
              Entries {!loading && `(${filteredEntries.length})`}
            </h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center gap-1 text-primary text-[13px] font-medium hover:opacity-70 transition-opacity duration-200"
            >
              {isCollapsed ? "Show" : "Hide"}
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isCollapsed ? "rotate-0" : "rotate-180"}`}>
                expand_more
              </span>
            </button>
          </div>

          <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"}`}>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-[#c8c8c0] border-t-[#5a7a5a] rounded-full animate-spin" />
              </div>
            )}
            {!loading && filteredEntries.length === 0 && (
              <div className="text-center py-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-[40px] mb-3 block opacity-40">history</span>
                <p className="text-[14px]">No entries found for this period.</p>
              </div>
            )}
            {!loading && visibleEntries.map((entry) => (
              <EntryRow key={entry.id} {...entry} />
            ))}
            <div className="flex items-center justify-center gap-3 mt-4">
              {hasMore && (
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredEntries.length))}
                  className="px-6 py-2 rounded-full border border-primary/20 text-primary font-['Manrope'] font-normal text-base leading-6 hover:bg-primary/5 transition-colors"
                >
                  Load More
                </button>
              )}
              {visibleCount > PAGE_SIZE && (
                <button
                  onClick={() => setVisibleCount(PAGE_SIZE)}
                  className="px-6 py-2 rounded-full border border-primary/20 text-primary font-['Manrope'] font-normal text-base leading-6 hover:bg-primary/5 transition-colors"
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