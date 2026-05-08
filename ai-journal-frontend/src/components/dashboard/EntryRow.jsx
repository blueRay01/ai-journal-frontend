import { useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

function scoreVariant(score) {
  if (score >= 8) return "bg-primary/10 text-primary border-primary/20";
  if (score >= 6) return "bg-secondary/10 text-secondary border-secondary/20";
  if (score >= 4) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

const MOOD_LABELS    = { sad: "😔 Sad", anxious: "😰 Anxious", neutral: "😐 Neutral", positive: "🙂 Positive", happy: "😊 Happy" };
const SLEEP_LABELS   = { restless: "Restless", poor: "Poor", neutral: "Neutral", good: "Good", excellent: "Excellent" };
const STRESS_LABELS  = { overwhelmed: "Overwhelmed", tense: "Tense", neutral: "Neutral", moderate: "Moderate", calm: "Calm" };

function StatPill({ label, value }) {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[11px] text-on-surface-variant">
      <span className="text-primary/60 font-medium">{label}</span>
      {value}
    </span>
  );
}

export default function EntryRow({ id, emoji, timestamp, score, preview, mood, sleepQuality, stressLevel, onClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insightText, setInsightText] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const summary = useMemo(() => {
    const text = (preview ?? "").trim();
    if (!text) return "";
    return text.length > 120 ? `${text.slice(0, 120).trim()}…` : text;
  }, [preview]);

  const fetchInsight = async () => {
    if (!id || insightText !== null) return;
    setInsightLoading(true);
    try {
      const snap = await getDoc(doc(db, "journalEntries", id));
      if (!snap.exists()) return;
      const data = snap.data();
      const ai = data?.aiInsight ?? data?.insight ?? data?.ai ?? data?.analysis ?? null;
      const text = typeof ai === "string"
        ? ai
        : ai?.content ?? ai?.text ?? ai?.message ?? null;
      setInsightText(text || null);
    } catch (err) {
      console.error("Failed to load insight:", err);
      setInsightText(null);
    } finally {
      setInsightLoading(false);
    }
  };

  const handleToggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    if (next) fetchInsight();
    onClick?.();
  };

  return (
    <div className="glass-panel rounded-lg border-primary/5">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full p-4 flex items-center justify-between group hover:bg-surface-container-low/50 transition-colors cursor-pointer text-left rounded-lg"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0">
            {emoji}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-label-sm text-primary font-semibold text-[13px]">
                {timestamp}
              </span>
              {score != null && (
                <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${scoreVariant(score)}`}>
                  Score {score}
                </div>
              )}
            </div>
            <p className={["text-on-surface-variant text-sm mt-1 leading-relaxed", isExpanded ? "line-clamp-2" : "truncate"].join(" ")}>
              {preview}
            </p>
          </div>
        </div>
        <span
          className={["material-symbols-outlined text-outline group-hover:text-primary transition-colors shrink-0 transform transition-transform duration-200", isExpanded ? "rotate-90" : "rotate-0"].join(" ")}
          aria-hidden="true"
        >
          chevron_right
        </span>
      </button>

      {/* Expanded panel */}
      <div className={["px-4 pb-4 transition-[max-height,opacity] duration-200 ease-out overflow-hidden", isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"].join(" ")}>
        <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-3">

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2">
            <StatPill label="Mood"   value={MOOD_LABELS[mood]      ?? mood} />
            <StatPill label="Sleep"  value={SLEEP_LABELS[sleepQuality]  ?? sleepQuality} />
            <StatPill label="Stress" value={STRESS_LABELS[stressLevel]  ?? stressLevel} />
          </div>

          {/* AI Insight */}
          {insightLoading && (
            <div className="flex items-center gap-2 text-[12px] text-on-surface-variant py-1">
              <div className="w-3.5 h-3.5 border-2 border-primary/20 border-t-primary rounded-full animate-spin shrink-0" />
              Loading insight…
            </div>
          )}

          {!insightLoading && insightText && (
            <div className="flex gap-2.5">
              <span className="material-symbols-outlined text-[16px] text-primary/60 shrink-0 mt-0.5">
                auto_awesome
              </span>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                {insightText}
              </p>
            </div>
          )}

          {!insightLoading && !insightText && (
            <p className="text-[12px] text-on-surface-variant/60 italic">
              No insight recorded for this entry.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}