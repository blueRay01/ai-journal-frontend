// src/pages/AIInsightPage.jsx
import { useNavigate } from "react-router-dom";
import InsightHeader from "../components/insight/InsightHeader";
import InsightContent from "../components/insight/InsightContent";
import InsightBackground from "../components/insight/InsightBackground";
import BottomNav from "../components/layout/BottomNav";

export default function AIInsightPage() {
  const navigate = useNavigate();

  return (
    <div className="text-on-background min-h-screen relative font-body-md overflow-x-hidden antialiased flex flex-col items-center pb-40" style={{ backgroundColor: '#FDFAF6', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E")' }}>
      <InsightBackground />
      
      <InsightHeader />
      
      <main className="w-full max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center grow relative z-10">
        <InsightContent />
      </main>

      <BottomNav activePage="insights" onNavigate={navigate} />
    </div>
  );
}