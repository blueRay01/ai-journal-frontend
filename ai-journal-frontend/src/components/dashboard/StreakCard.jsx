// src/components/dashboard/StreakCard.jsx

const STREAK_DAYS = 12;
const FILLED_DOTS = 3; // how many of the 5 indicator dots are active

export default function StreakCard() {
  return (
    <div className="md:col-span-4 bg-surface-container-low/85 backdrop-blur-xl border border-white/50 rounded-xl p-8 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary/60" />

      <span
        className="material-symbols-outlined text-primary text-4xl mb-2"
        style={{ fontVariationSettings: '"FILL" 1' }}
      >
        local_fire_department
      </span>

      <h2 className="font-display text-[64px] font-light leading-none text-on-surface">
        {STREAK_DAYS}
      </h2>

      <p className="font-label-caps text-on-surface-variant mt-2 tracking-widest uppercase text-xs">
        Day Streak
      </p>

      {/* Progress dots */}
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-1 rounded-full ${
              i < FILLED_DOTS ? "bg-primary" : "bg-surface-variant"
            }`}
          />
        ))}
      </div>
    </div>
  );
}