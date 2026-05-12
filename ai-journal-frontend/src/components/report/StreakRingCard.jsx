// src/components/report/StreakRingCard.jsx
export default function StreakRingCard({ days = 5, label = "Consistent clarity" }) {
  // Visual reset after 7-day streak (same as StreakCard)
  const displayDays = days % 7 || 7; // Show 7 if days is multiple of 7
  const shouldReset = days >= 7 && days % 7 === 0;
  
  // Calculate stroke dash offset based on progress (max 7 days before reset)
  const maxDays = 7;
  const progress = Math.min(displayDays / maxDays, 1);
  const circumference = 2 * Math.PI * 46; // radius = 46
  const strokeDashoffset = circumference * (1 - progress);
  
  return (
    <section className="paper-card p-8 flex flex-col sm:flex-row items-center gap-6 justify-center text-center sm:text-left">
      {/* Circular progress ring */}
      <div className="w-24 h-24 shrink-0 rounded-full border-4 border-primary-fixed flex items-center justify-center relative shadow-[0_0_30px_rgba(188,204,172,0.4)]">
        <span className="font-h2 text-[32px] font-semibold leading-snug text-primary">{days}</span>
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            className="text-primary-container/20"
            cx="50" cy="50" r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle
            className="text-primary"
            cx="50" cy="50" r="46"
            fill="none"
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeWidth="4"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
      </div>
      <div>
        <h3 className="font-h3 text-[24px] font-semibold text-on-surface mb-1">Day Streak</h3>
        <p className="text-[16px] text-outline leading-relaxed">
          {shouldReset ? `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} completed! ${label}` : label}
        </p>
      </div>
    </section>
  );
}