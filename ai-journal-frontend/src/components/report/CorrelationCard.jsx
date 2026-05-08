// src/components/report/CorrelationCard.jsx
import { useState, useEffect } from "react";

export default function CorrelationCard({ entries = [] }) {
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entries.length < 3) {
      setCorrelation(null);
      return;
    }

    const analyzeCorrelations = async () => {
      setLoading(true);
      try {
        // Prepare data for AI analysis
        const analysisData = entries.map(entry => ({
          date: entry.createdAt.toLocaleDateString(),
          sleepQuality: entry.sleepQuality,
          exercise: entry.exercise,
          mood: entry.mood,
          stressLevel: entry.stressLevel,
          wellnessScore: entry.summaryScore || 0
        }));

        // Call AI API for correlation analysis
        const response = await fetch("http://localhost:5000/api/analyze-correlations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries: analysisData })
        });

        if (response.ok) {
          const data = await response.json();
          setCorrelation(data.correlation);
        } else {
          // Fallback to basic pattern analysis if AI fails
          const fallbackCorrelation = analyzeBasicPatterns(analysisData);
          setCorrelation(fallbackCorrelation);
        }
      } catch (error) {
        console.error("Error analyzing correlations:", error);
        // Fallback to basic analysis
        const fallbackCorrelation = analyzeBasicPatterns(entries);
        setCorrelation(fallbackCorrelation);
      } finally {
        setLoading(false);
      }
    };

    analyzeCorrelations();
  }, [entries]);

  const analyzeBasicPatterns = (data) => {
    // Simple correlation analysis as fallback
    const goodSleepDays = data.filter(entry => 
      entry.sleepQuality === 'good' || entry.sleepQuality === 'excellent'
    );
    const poorSleepDays = data.filter(entry => 
      entry.sleepQuality === 'poor' || entry.sleepQuality === 'restless'
    );
    
    const exerciseDays = data.filter(entry => entry.exercise);
    const noExerciseDays = data.filter(entry => !entry.exercise);
    
    const avgMoodGoodSleep = goodSleepDays.length > 0 
      ? goodSleepDays.reduce((sum, day) => sum + (day.wellnessScore || 0), 0) / goodSleepDays.length 
      : 0;
    const avgMoodPoorSleep = poorSleepDays.length > 0 
      ? poorSleepDays.reduce((sum, day) => sum + (day.wellnessScore || 0), 0) / poorSleepDays.length 
      : 0;
    
    const avgMoodExercise = exerciseDays.length > 0 
      ? exerciseDays.reduce((sum, day) => sum + (day.wellnessScore || 0), 0) / exerciseDays.length 
      : 0;
    const avgMoodNoExercise = noExerciseDays.length > 0 
      ? noExerciseDays.reduce((sum, day) => sum + (day.wellnessScore || 0), 0) / noExerciseDays.length 
      : 0;

    if (avgMoodGoodSleep > avgMoodPoorSleep + 1) {
      return {
        title: "Sleep Quality Impact",
        body: `Your data shows that good sleep quality is associated with ${Math.round((avgMoodGoodSleep - avgMoodPoorSleep) * 10)}% higher wellness scores compared to poor sleep days.`
      };
    } else if (avgMoodExercise > avgMoodNoExercise + 1) {
      return {
        title: "Exercise Benefits", 
        body: `Days with exercise show ${Math.round((avgMoodExercise - avgMoodNoExercise) * 10)}% higher wellness scores than days without physical activity.`
      };
    } else {
      return {
        title: "Pattern Analysis",
        body: "Continue tracking to discover more patterns in your wellness journey. More data will reveal deeper insights."
      };
    }
  };

  if (entries.length < 3) {
    return (
      <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
        <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
          <span
            className="material-symbols-outlined text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
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
    body: "Your journal patterns are being analyzed. Continue tracking for deeper insights."
  };

  return (
    <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
      <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
        <span
          className="material-symbols-outlined text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          insights
        </span>
      </div>

      <div>
        <h3 className="text-[24px] font-semibold text-on-surface mb-2">{displayCorrelation.title}</h3>
        <p className="text-[18px] text-outline leading-relaxed">
          {displayCorrelation.body}
        </p>
      </div>
    </section>
  );
}