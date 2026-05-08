export default function ResonanceTrackerCard({ goalPct = 0 }) {
  const r = 22;
  const cx = 28;
  const cy = 28;
  const circumference = 2 * Math.PI * r;
  const dash = (goalPct / 100) * circumference;
  const gap = circumference - dash;

  return (
    <div className="md:col-span-12 bg-[#f2f2ee] rounded-2xl px-5 py-4 flex items-center justify-between">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-[#5a7a5a] text-lg mt-0.5">
          self_improvement
        </span>
        <div>
          <p className="text-sm font-medium text-[#2a3a2a]">Resonance Tracker</p>
          <p className="text-xs text-[#888880] mt-0.5">
            Recommended by insights: Daily Meditation
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ddddd5" strokeWidth="3" />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#3a4a3a"
            strokeWidth="3"
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="round"
            style={{ transform: "rotate(-90deg)", transformOrigin: "28px 28px" }}
          />
          <text
            x={cx}
            y={cy + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontWeight="600"
            fill="#2a3a2a"
            fontFamily="inherit"
          >
            {goalPct}%
          </text>
        </svg>
        <span className="text-[10px] text-[#aaa89a]">Goal</span>
      </div>
    </div>
  );
}