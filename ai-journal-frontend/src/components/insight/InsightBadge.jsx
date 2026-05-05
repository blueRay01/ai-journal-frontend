// src/components/insight/InsightBadge.jsx

export default function InsightBadge() {
  return (
    <div className="flex justify-between items-start">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm gap-2">
        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
        Insight Generated
      </div>
      <button className="text-primary/40 hover:text-primary transition-colors p-2 bg-white/50 rounded-full hover:bg-white/80">
        <span className="material-symbols-outlined">share</span>
      </button>
    </div>
  );
}