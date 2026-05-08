// src/components/dashboard/StreakCard.jsx
import { useState } from "react";

export default function StreakCard() {
  const [currentStreak, setCurrentStreak] = useState(6);
  
  // Reset colors after 7-day streak
  const shouldReset = currentStreak >= 7;
  
  return (
    <div className="md:col-span-3 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col items-center justify-center gap-2 min-h-[140px]">
      {/* Flame icon */}
      <span className="material-symbols-outlined text-[#3a4a3a] text-3xl leading-none">
        local_fire_department
      </span>

      {/* Count */}
      <span className="font-display text-5xl font-light text-[#2a3a2a] leading-none">
        6
      </span>

      {/* Label */}
      <span className="text-xs text-[#888880] tracking-wide">Day Streak</span>

      {/* Dash row */}
      <div className="flex gap-1 mt-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`w-5 h-[3px] rounded-full ${shouldReset ? "bg-[#c8c8c0]" : "bg-[#5a7a5a]"}`} />
        ))}
      </div>
      <div className="flex gap-1 mt-1">
        {[4, 5].map((i) => (
          <div key={i} className={`w-5 h-[3px] rounded-full ${shouldReset ? "bg-[#c8c8c0]" : "bg-[#5a7a5a]"}`} />
        ))}
        {[6].map((i) => (
          <div key={i} className={`w-5 h-[3px] rounded-full ${shouldReset ? "bg-[#c8c8c0]" : "bg-[#c8c8c0]"}`} />
        ))}
      </div>
    </div>
  );
}
