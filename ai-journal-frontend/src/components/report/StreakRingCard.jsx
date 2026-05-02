// src/components/report/StreakRingCard.jsx

export default function StreakRingCard({ days = 5, label = "Consistent clarity" }) {
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
            strokeDasharray="289"
            strokeDashoffset="80"
            strokeWidth="4"
          />
        </svg>
      </div>

      <div>
        <h3 className="font-h3 text-[24px] font-semibold text-on-surface mb-1">Day Streak</h3>
        <p className="text-[16px] text-outline leading-relaxed">{label}</p>
      </div>
    </section>
  );
}