// src/pages/ReportPage.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";
import StreakRingCard from "../components/report/StreakRingCard";
import PeakResonanceCard from "../components/report/PeakResonanceCard";
import HighFrictionCard from "../components/report/HighFrictionCard";
import CorrelationCard from "../components/report/CorrelationCard";
import FocusCard from "../components/report/FocusCard";
import { getRecordingDate } from "../utils/testDateTime";

// Returns the Monday of the current week at 00:00:00
function getStartOfWeek() {
  const now = getRecordingDate(); // Use targeted date/time system
  const day = now.getDay(); // 0 = Sun
  const diff = (day === 0 ? -6 : 1) - day; // shift so Mon = start
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export default function ReportPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [weekEntries, setWeekEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streakData, setStreakData] = useState({ days: 0, label: "Consistent clarity" });
  const [peakDay, setPeakDay] = useState({ day: "", description: "" });
  const [frictionDay, setFrictionDay] = useState({ day: "", description: "" });
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const entriesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            // Normalise aiInsight so cards always have a consistent shape
            aiInsight: data.aiInsight ?? data.insight ?? data.ai ?? data.analysis ?? null,
          };
        });

        setEntries(entriesData);
        calculateReportData(entriesData);

        // Filter to current week (Mon – now) for AI-powered cards
        const weekStart = getStartOfWeek();
        const thisWeek = entriesData.filter(
          e => e.createdAt && e.createdAt >= weekStart
        );
        setWeekEntries(thisWeek);

        if (entriesData.length > 0) {
          const latest = entriesData[0].createdAt;
          const oldest = entriesData[entriesData.length - 1].createdAt;
          const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          setDateRange(`${fmt(oldest)} – ${fmt(latest)}`);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user]);

  const calculateReportData = (entries) => {
    if (entries.length === 0) {
      setStreakData({ days: 0, label: "No entries yet" });
      return;
    }

    // ── Streak ──────────────────────────────────────────────────────────────
    let streak = 0;
    let currentDate = getRecordingDate(); // Use test date/time system
    currentDate.setHours(0, 0, 0, 0);

    const sortedEntries = [...entries].sort((a, b) => {
      const da = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const db_ = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return db_ - da;
    });

    const todayEntry = sortedEntries.find(entry => {
      const d = new Date(entry.createdAt); d.setHours(0, 0, 0, 0);
      return d.getTime() === currentDate.getTime();
    });
    if (!todayEntry) currentDate.setDate(currentDate.getDate() - 1);

    while (true) {
      const found = sortedEntries.find(entry => {
        const d = new Date(entry.createdAt); d.setHours(0, 0, 0, 0);
        return d.getTime() === currentDate.getTime();
      });
      if (found) { streak++; currentDate.setDate(currentDate.getDate() - 1); }
      else break;
    }

    setStreakData({ days: streak, label: streak > 0 ? "Consistent clarity" : "Start your journey" });

    // ── Peak / Friction ──────────────────────────────────────────────────────
    const MOOD_SCORES   = { sad: 2, anxious: 4, neutral: 5, positive: 7, happy: 9 };
    const SLEEP_SCORES  = { restless: 2, poor: 4, neutral: 5, good: 7, excellent: 9 };
    const STRESS_SCORES = { overwhelmed: 1, tense: 3, neutral: 5, moderate: 7, calm: 9 };

    const deriveScore = (entry) => {
      if (entry.summaryScore != null) return Number(entry.summaryScore);
      const m = MOOD_SCORES[entry.mood]          ?? 5;
      const s = SLEEP_SCORES[entry.sleepQuality] ?? 5;
      const t = STRESS_SCORES[entry.stressLevel] ?? 5;
      return Math.min(Math.round((m + s + t) / 3 + (entry.exercise ? 0.5 : 0)), 10);
    };

    let peakEntry = null, peakScore = -1;
    let frictionEntry = null, frictionScore = Infinity;

    entries.forEach(entry => {
      const score = deriveScore(entry);
      if (score > peakScore)     { peakScore = score;     peakEntry = entry; }
      if (score < frictionScore) { frictionScore = score; frictionEntry = entry; }
    });

    if (peakEntry) {
      const score   = deriveScore(peakEntry);
      const dayName = peakEntry.createdAt.toLocaleDateString("en-US", { weekday: "long" });
      setPeakDay({
        day: dayName,
        description: `High wellness score (${score}/10) with ${peakEntry.mood || "neutral"} mood and ${peakEntry.stressLevel || "neutral"} stress levels.`,
        score,
      });
    }

    if (frictionEntry) {
      const score   = deriveScore(frictionEntry);
      const dayName = frictionEntry.createdAt.toLocaleDateString("en-US", { weekday: "long" });
      setFrictionDay({
        day: dayName,
        description: `Lower wellness day (${score}/10) with ${frictionEntry.mood || "neutral"} mood and ${frictionEntry.stressLevel || "neutral"} stress levels.`,
        score,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-f5f5f0 to-e8e8e0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-c8c8c0 border-t-5a7a5a rounded-full animate-spin" />
          <p className="mt-4 text-888880">Loading report...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="text-on-surface font-body-md min-h-screen relative overflow-x-hidden pb-[120px] antialiased"
      style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
    >
      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      <main className="w-full max-w-2xl mx-auto px-6 pt-32 pb-24 flex flex-col gap-8 relative z-10">
        <header className="flex flex-col items-center text-center mb-4">
          <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 mb-6">
            <span
              className="material-symbols-outlined text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="font-label-caps text-xs tracking-widest uppercase font-bold text-primary-container">
              {entries.length > 0 ? "Personal Insights" : "Start Your Journey"}
            </span>
          </div>
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary mb-2">
            Personal Report
          </h1>
          <p className="text-[18px] text-outline leading-relaxed">{dateRange || "No entries yet"}</p>
        </header>

        <StreakRingCard days={streakData.days} label={streakData.label} />
        {peakDay.day     && <PeakResonanceCard day={peakDay.day}     description={peakDay.description}     score={peakDay.score} />}
        {frictionDay.day && <HighFrictionCard  day={frictionDay.day} description={frictionDay.description} score={frictionDay.score} />}

        {/* Pass this week's entries (with aiInsight) to the AI-powered cards */}
        <CorrelationCard entries={weekEntries.length >= 3 ? weekEntries : entries} />
        <FocusCard       entries={weekEntries.length >= 1 ? weekEntries : entries} />
      </main>

      <BottomNav activePage="report" onNavigate={navigate} />
    </div>
  );
}