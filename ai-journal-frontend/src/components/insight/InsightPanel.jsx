// src/components/insight/InsightPanel.jsx
import InsightBadge from "./InsightBadge";
import InsightActions from "./InsightActions";

export default function InsightPanel() {
  return (
    <div className="glass-panel p-8 md:p-12 rounded-4xl flex flex-col gap-10" style={{ background: 'rgba(253, 250, 246, 0.6)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.9)', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.05)' }}>
      <InsightBadge />
      
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-4xl md:text-5xl text-primary font-medium tracking-tight">
          A Moment of Clarity
        </h1>
        <p className="font-body-lg text-lg md:text-xl text-on-surface-variant leading-relaxed">
          Based on your recent entries, we noticed a beautiful pattern. Your focus and sense of calm consistently peak on days you complete your morning walk before 8 AM.
        </p>
      </div>
      
      <InsightActions />
    </div>
  );
}