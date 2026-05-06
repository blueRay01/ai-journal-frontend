// src/pages/AIInsightPage.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InsightContent from "../components/insight/InsightContent";
import InsightBackground from "../components/insight/InsightBackground";
import BottomNav from "../components/layout/BottomNav";
import DashboardHeader from "../components/layout/DashboardHeader";

// Sample insight data - in a real app, this would come from AI analysis
const SAMPLE_INSIGHTS = [
  {
    id: 1,
    type: "morning_routine",
    title: "A Moment of Clarity",
    content: "Based on your recent entries, we noticed a beautiful pattern. Your focus and sense of calm consistently peak on days you complete your morning walk before 8 AM."
  },
  {
    id: 2,
    type: "stress_management",
    title: "Stress Relief Through Nature",
    content: "Your journal entries show that spending time in nature significantly reduces your stress levels. Consider adding more outdoor activities to your routine."
  },
  {
    id: 3,
    type: "sleep_quality",
    title: "Sleep and Performance Connection",
    content: "We've noticed that nights with 7+ hours of sleep consistently lead to better mood and productivity the following day."
  },
  {
    id: 4,
    type: "mood_improvement",
    title: "Positive Momentum Building",
    content: "Your mood has been steadily improving over the past week. This positive trend correlates with your increased physical activity."
  },
  {
    id: 5,
    type: "exercise_consistency",
    title: "Consistency is Key",
    content: "Even short 15-minute exercise sessions are contributing significantly to your overall wellbeing and energy levels."
  },
  {
    id: 6,
    type: "energy_levels",
    title: "Energy Flow Optimization",
    content: "Your energy levels peak in the late morning. Consider scheduling important tasks during this optimal window."
  }
];

const styles = `
  body {
    background-color: #FDFAF6;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
    min-height: 100vh;
  }
`;

export default function AIInsightPage() {
  const navigate = useNavigate();
  const [currentInsight, setCurrentInsight] = useState(SAMPLE_INSIGHTS[0]);

  // In a real app, this would fetch insights from an AI service
  // For now, we'll cycle through sample insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => {
        const currentIndex = SAMPLE_INSIGHTS.findIndex(insight => insight.id === prev.id);
        const nextIndex = (currentIndex + 1) % SAMPLE_INSIGHTS.length;
        return SAMPLE_INSIGHTS[nextIndex];
      });
    }, 5000); // Change insight every 5 seconds for smoother transitions

    return () => clearInterval(interval);
  }, []);

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
      <div className="text-on-background min-h-screen relative font-body-md overflow-x-clip antialiased flex flex-col items-center pb-40">
        <InsightBackground />
        
        <DashboardHeader />
        
        <main className="w-full max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start grow relative z-10">
          <InsightContent insightType={currentInsight.type} />
        </main>

        <BottomNav activePage="insights" onNavigate={navigate} />
      </div>
    </>
  );
}