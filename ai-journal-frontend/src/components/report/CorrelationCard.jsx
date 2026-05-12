// src/components/report/CorrelationCard.jsx
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export default function CorrelationCard({ entries = [] }) {
  const { user } = useAuth();
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || entries.length < 3) {
      setCorrelation(null);
      return;
    }

    const analyzeCorrelations = async () => {
      setLoading(true);

      // Check Firestore cache first
      const weekKey = getWeekKey();
      const correlationRef = doc(db, "users", user.uid, "weeklyCorrelations", weekKey);

      try {
        const cached = await getDoc(correlationRef);
        if (cached.exists()) {
          setCorrelation(cached.data());
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to read cached correlation:", err);
      }

      // Not cached — build payload including AI insight text, then fetch
      try {
        const analysisData = entries.map(entry => ({
          date: entry.createdAt instanceof Date
            ? entry.createdAt.toLocaleDateString()
            : new Date(entry.createdAt).toLocaleDateString(),
          sleepQuality:   entry.sleepQuality,
          exercise:       entry.exercise,
          mood:           entry.mood,
          stressLevel:    entry.stressLevel,
          wellnessScore:  entry.summaryScore || 0,
          // Include the AI-generated insight text for richer context
          aiInsight:      entry.aiInsight?.content
                          || entry.aiInsight?.text
                          || (typeof entry.aiInsight === "string" ? entry.aiInsight : null)
                          || null,
        }));

        const response = await fetch("http://localhost:5000/api/analyze-correlations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: analysisData }),
        });

        let result;
        if (response.ok) {
          const data = await response.json();
          result = data.correlation;
        } else {
          result = analyzeBasicPatterns(analysisData);
        }

        setCorrelation(result);

        // Persist to Firestore
        await setDoc(correlationRef, {
          title: result.title,
          body: result.body,
          generatedAt: new Date().toISOString(),
          weekKey,
        });
      } catch (error) {
        console.error("Error analyzing correlations:", error);
        const fallback = analyzeBasicPatterns(entries);
        setCorrelation(fallback);
      } finally {
        setLoading(false);
      }
    };

    analyzeCorrelations();
  }, [user, entries]);

  const analyzeBasicPatterns = (data) => {
    const goodSleepDays  = data.filter(e => e.sleepQuality === "good" || e.sleepQuality === "excellent");
    const poorSleepDays  = data.filter(e => e.sleepQuality === "poor" || e.sleepQuality === "restless");
    const exerciseDays   = data.filter(e => e.exercise);
    const noExerciseDays = data.filter(e => !e.exercise);

    const avg = (arr) => arr.length
      ? arr.reduce((s, d) => s + (d.wellnessScore || 0), 0) / arr.length
      : 0;

    const avgGoodSleep = avg(goodSleepDays);
    const avgPoorSleep = avg(poorSleepDays);
    const avgExercise  = avg(exerciseDays);
    const avgNoExercise = avg(noExerciseDays);

    if (avgGoodSleep > avgPoorSleep + 1) {
      return {
        title: "Sleep Quality Impact",
        body: `Good sleep is associated with ${Math.round((avgGoodSleep - avgPoorSleep) * 10)}% higher wellness scores compared to poor sleep days.`,
      };
    } else if (avgExercise > avgNoExercise + 1) {
      return {
        title: "Exercise Benefits",
        body: `Days with exercise show ${Math.round((avgExercise - avgNoExercise) * 10)}% higher wellness scores than days without physical activity.`,
      };
    } else {
      return {
        title: "Pattern Analysis",
        body: "Continue tracking to discover more patterns in your wellness journey. More data will reveal deeper insights.",
      };
    }
  };

  if (entries.length < 3) {
    return (
      <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
        <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            insights
          </span>
        </div>
        <div>
          <h3 className="text-[24px] font-semibold text-on-surface mb-2">Pattern Discovery</h3>
          <p className="text-[18px] text-outline leading-relaxed">
            Continue journaling to unlock personalized correlations. Need at least 3 entries to reveal patterns.
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
        <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
          <div className="w-8 h-8 border-2 border-tertiary-container border-t-tertiary rounded-full animate-spin" />
        </div>
        <div>
          <h3 className="text-[24px] font-semibold text-on-surface mb-2">Analyzing Patterns</h3>
          <p className="text-[18px] text-outline leading-relaxed">
            Discovering correlations in your wellness data...
          </p>
        </div>
      </section>
    );
  }

  const displayCorrelation = correlation || {
    title: "Pattern Analysis",
    body: "Your journal patterns are being analyzed. Continue tracking for deeper insights.",
  };

  return (
    <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
      <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          insights
        </span>
      </div>
      <div>
        <h3 className="text-[24px] font-semibold text-on-surface mb-2">{displayCorrelation.title}</h3>
        <p className="text-[18px] text-outline leading-relaxed">{displayCorrelation.body}</p>
      </div>
    </section>
  );
}