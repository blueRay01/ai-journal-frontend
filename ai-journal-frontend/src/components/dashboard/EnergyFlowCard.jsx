// src/components/dashboard/EnergyFlowCard.jsx
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

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

function buildPath(values, w, h, pad) {
  const xStep = (w - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: pad + i * xStep,
    y: h - pad - ((v / 10) * (h - pad * 2)), // scores are 0–10
  }));
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cpx} ${points[i - 1].y}, ${cpx} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }
  return { d, points };
}

export default function EnergyFlowCard() {
  const { user } = useAuth();
  const [chartData, setChartData] = useState(null); // null = loading

  useEffect(() => {
    if (!user) return;
    const fetchScores = async () => {
      try {
        const q = query(
          collection(db, "journalEntries"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(7)
        );
        const snap = await getDocs(q);

        // Build a map of day-label → score from newest to oldest
        const entries = snap.docs.map((docSnap) => {
          const data = docSnap.data();
          const date = data.createdAt?.toDate?.() ?? new Date();
          const score = data.summaryScore != null
            ? data.summaryScore
            : data.mood
              ? calculateWellnessScore(
                  data.mood         || "neutral",
                  data.sleepQuality || "neutral",
                  data.stressLevel  || "neutral",
                  data.exercise     || false
                )
              : 5;
          const label = date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
          return { label, score, date };
        }).reverse(); // oldest → newest so chart reads left to right

        setChartData(entries);
      } catch (err) {
        console.error("EnergyFlowCard fetch failed:", err);
        setChartData([]);
      }
    };
    fetchScores();
  }, [user]);

  const W = 380;
  const H = 120;
  const PAD = 16;

  // Skeleton while loading
  if (chartData === null) {
    return (
      <div className="md:col-span-7 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#3a3a35]">Energy Flow</span>
          <span className="text-xs text-[#888880]">Last 7 Days</span>
        </div>
        <div className="h-[120px] rounded-lg bg-[#e8e8e2]" />
        <div className="h-3 w-48 rounded bg-[#e8e8e2]" />
      </div>
    );
  }

  // Need at least 2 points to draw a line
  if (chartData.length < 2) {
    return (
      <div className="md:col-span-7 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#3a3a35]">Energy Flow</span>
          <span className="text-xs text-[#888880]">Last 7 Days</span>
        </div>
        <p className="text-xs text-[#aaa89a] py-8 text-center">Log more entries to see your energy flow.</p>
      </div>
    );
  }

  const values = chartData.map((e) => e.score);
  const labels = chartData.map((e) => e.label);
  const todayIdx = chartData.length - 1;
  const { d, points } = buildPath(values, W, H, PAD);
  const fillD = d + ` L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  return (
    <div className="md:col-span-7 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#3a3a35]">Energy Flow</span>
        <span className="text-xs text-[#888880]">Last 7 Days</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="ef-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a7a5a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#5a7a5a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#ef-fill)" />
        <path d={d} fill="none" stroke="#5a7a5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((pt, i) => (
          <g key={i}>
            {i === todayIdx ? (
              <>
                <circle cx={pt.x} cy={pt.y} r={6} fill="#7c6fa0" />
                <circle cx={pt.x} cy={pt.y} r={3} fill="white" />
              </>
            ) : (
              <circle cx={pt.x} cy={pt.y} r={3.5} fill="#3a4a3a" />
            )}
          </g>
        ))}
      </svg>
      <div className="flex justify-between" style={{ paddingLeft: PAD, paddingRight: PAD }}>
        {labels.map((label, i) => (
          <span key={i} className={`text-xs ${i === todayIdx ? "text-[#7c6fa0] font-semibold" : "text-[#aaa89a]"}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}