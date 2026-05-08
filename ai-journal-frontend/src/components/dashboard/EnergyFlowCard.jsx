// src/components/dashboard/EnergyFlowCard.jsx
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const VALUES = [38, 52, 45, 68, 72, 60, 55]; // 0-100 scale

function buildPath(values, w, h, pad) {
  const xStep = (w - pad * 2) / (values.length - 1);
  const points = values.map((v, i) => ({
    x: pad + i * xStep,
    y: h - pad - (v / 100) * (h - pad * 2),
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = (points[i - 1].x + points[i].x) / 2;
    d += ` C ${cpx} ${points[i - 1].y}, ${cpx} ${points[i].y}, ${points[i].x} ${points[i].y}`;
  }
  return { d, points };
}

export default function EnergyFlowCard() {
  const W = 380;
  const H = 120;
  const PAD = 16;
  const { d, points } = buildPath(VALUES, W, H, PAD);

  // Build fill path (close below the line)
  const fillD =
    d +
    ` L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  const todayIdx = VALUES.length - 1; // "S" is today

  return (
    <div className="md:col-span-7 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#3a3a35]">Energy Flow</span>
        <span className="text-xs text-[#888880]">Last 7 Days</span>
      </div>

      {/* SVG chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ overflow: "visible" }}
      >
        {/* Fill */}
        <defs>
          <linearGradient id="ef-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a7a5a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#5a7a5a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#ef-fill)" />

        {/* Line */}
        <path
          d={d}
          fill="none"
          stroke="#5a7a5a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((pt, i) => (
          <g key={i}>
            {i === todayIdx ? (
              <>
                {/* Today: filled purple dot */}
                <circle cx={pt.x} cy={pt.y} r={6} fill="#7c6fa0" />
                <circle cx={pt.x} cy={pt.y} r={3} fill="white" />
              </>
            ) : (
              <>
                {/* Other days: small dark dot */}
                <circle cx={pt.x} cy={pt.y} r={3.5} fill="#3a4a3a" />
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Day labels */}
      <div className="flex justify-between px-[16px]">
        {DAYS.map((d, i) => (
          <span
            key={i}
            className={`text-xs ${
              i === todayIdx
                ? "text-[#7c6fa0] font-semibold"
                : "text-[#aaa89a]"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
