// src/pages/AIInsightPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InsightContent from "../components/insight/InsightContent";
import InsightBackground from "../components/insight/InsightBackground";
import BottomNav from "../components/layout/BottomNav";
import DashboardHeader from "../components/layout/DashboardHeader";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { collection, doc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";

function normalizeTimeline(raw) {
  if (!raw) return [];

  let value = raw;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      // If it's just a plain string, we can't meaningfully render as a timeline.
      return [];
    }
  }

  if (!Array.isArray(value)) return [];
  return value
    .filter(Boolean)
    .map((item) => {
      if (typeof item === "string") {
        return { time: "", title: item, subtitle: "" };
      }
      return {
        time: item.time || item.startTime || item.when || "",
        title: item.title || item.activity || item.name || "Activity",
        subtitle: item.subtitle || item.note || item.description || "",
      };
    });
}

function normalizeInsight(entryData) {
  const ai =
    entryData?.aiInsight ??
    entryData?.insight ??
    entryData?.ai ??
    entryData?.analysis ??
    null;

  if (!ai) {
    return {
      type: entryData?.insightType || "morning_routine",
      title: "",
      content: "",
    };
  }

  if (typeof ai === "string") {
    return {
      type: entryData?.insightType || "morning_routine",
      title: "Your AI Insight",
      content: ai,
    };
  }

  return {
    type: ai.type || entryData?.insightType || "morning_routine",
    title: ai.title || "Your AI Insight",
    content: ai.content || ai.text || ai.message || "",
  };
}

function checkStreakBroken(entries) {
  if (entries.length < 2) return false;
  
  // Check for gaps in consecutive days
  for (let i = 1; i < entries.length; i++) {
    const currentDate = new Date(entries[i].createdAt);
    const previousDate = new Date(entries[i-1].createdAt);
    
    // Reset both dates to start of day for accurate comparison
    currentDate.setHours(0, 0, 0, 0);
    previousDate.setHours(0, 0, 0, 0);
    
    // Calculate the difference in days
    const diffTime = currentDate - previousDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If there's a gap of more than 1 day, streak is broken
    if (diffDays > 1) {
      return true;
    }
  }
  
  return false;
}

export default function AIInsightPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [insight, setInsight] = useState({ type: "morning_routine", title: "", content: "" });
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstDay, setIsFirstDay] = useState(true);
  const [showTomorrowPlanToday, setShowTomorrowPlanToday] = useState(false);
  const [entryDate, setEntryDate] = useState(null);

  const entryId = location?.state?.entryId;

  useEffect(() => {
    if (!user) return;

    let unsubscribe = null;

    const subscribeToEntry = (id) => {
      const ref = doc(db, "journalEntries", id);
      unsubscribe = onSnapshot(
        ref,
        (snap) => {
          if (!snap.exists()) {
            setLoading(false);
            return;
          }

          const data = snap.data();
          const nextInsight = normalizeInsight(data);
          const nextTimeline = normalizeTimeline(
            data?.tomorrowTimeline ??
              data?.tomorrowActivities ??
              data?.tomorrow ??
              data?.timelineTomorrow ??
              data?.aiTimeline ??
              null
          );

          setInsight(nextInsight);
          setTimeline(nextTimeline);
          
          // Check if this is the first day or if we should show tomorrow's plan today
          const entryCreatedAt = data.createdAt?.toDate();
          if (entryCreatedAt) {
            setEntryDate(entryCreatedAt);
          }
          
          setLoading(false);
        },
        (err) => {
          console.error("Failed to subscribe to entry:", err);
          setLoading(false);
        }
      );
    };

    const subscribeToLatestEntry = async () => {
      try {
        const entriesRef = collection(db, "journalEntries");
        
        // Get all entries to check if it's the first day and detect streak
        const allEntriesQuery = query(entriesRef, where("userId", "==", user.uid), orderBy("createdAt", "asc"));
        const allEntriesSnapshot = await getDocs(allEntriesQuery);
        const allEntries = allEntriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        
        setIsFirstDay(allEntries.length <= 1);
        
        // Check if streak is broken (missing days between entries)
        if (allEntries.length > 1) {
          const streakBroken = checkStreakBroken(allEntries);
          setShowTomorrowPlanToday(streakBroken);
        } else {
          setShowTomorrowPlanToday(true); // First day, show tomorrow's plan today
        }
        
        // Then get the latest entry
        const q = query(entriesRef, where("userId", "==", user.uid), orderBy("createdAt", "desc"), limit(1));
        const qs = await getDocs(q);
        if (qs.empty) {
          setLoading(false);
          return;
        }
        subscribeToEntry(qs.docs[0].id);
      } catch (err) {
        console.error("Failed to load latest entry:", err);
        setLoading(false);
      }
    };

    if (entryId) subscribeToEntry(entryId);
    else subscribeToLatestEntry();

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [user, entryId]);

  const styles = `
  body {
    background-color: #FDFAF6;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
    min-height: 100vh;
  }

  .aura-1 {
    position: fixed;
    top: -20%;
    left: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(173,207,178,0.7) 0%, rgba(253,250,246,0) 70%);
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
    pointer-events: none;
  }

  .aura-2 {
    position: fixed;
    bottom: -10%;
    right: -20%;
    width: 70vw;
    height: 70vw;
    background: radial-gradient(circle, rgba(173,207,178,0.6) 0%, rgba(253,250,246,0) 70%);
    border-radius: 50%;
    filter: blur(90px);
    z-index: -1;
    pointer-events: none;
  }

  .glass-panel {
    background: rgba(253, 250, 246, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.05);
  }
`;

  return (
    <>
      <style>{styles}</style>
      <div 
        className="text-on-background min-h-screen relative font-body-md overflow-x-clip antialiased flex flex-col items-center pb-40"
        style={{ background: "linear-gradient(160deg, rgb(238, 244, 232) 0%, rgb(255, 255, 255) 50%, rgb(245, 245, 239) 100%)" }}
      >
        <InsightBackground />
        
        <DashboardHeader />
        
        <main className="w-full max-w-6xl mx-auto px-6 py-12 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start grow relative z-10">
          <InsightContent
            insightType={insight.type}
            title={insight.title}
            content={
              loading
                ? "We're generating your insight from today's entry…"
                : insight.content
            }
            timeline={timeline}
            showTomorrowPlanToday={showTomorrowPlanToday}
            entryDate={entryDate}
          />
        </main>

        <BottomNav activePage="insights" onNavigate={navigate} />
      </div>
    </>
  );
}