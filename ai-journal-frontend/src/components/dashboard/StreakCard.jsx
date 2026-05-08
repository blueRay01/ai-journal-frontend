// src/components/dashboard/StreakCard.jsx
export default function StreakCard() {
  return (
    <div className="md:col-span-3 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 min-h-[140px]">
      {/* Flame icon */}
      <span className="material-symbols-outlined text-[#3a4a3a] text-3xl leading-none">
        local_fire_department
      </span>

      {/* Count */}
      <span className="font-display text-5xl font-light text-[#2a3a2a] leading-none">
        12
      </span>

      {/* Label */}
      <span className="text-xs text-[#888880] tracking-wide">Day Streak</span>

      {/* Dash row */}
      <div className="flex gap-1 mt-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-5 h-[3px] rounded-full bg-[#c8c8c0]" />
        ))}
      </div>
    </div>
  );
}
