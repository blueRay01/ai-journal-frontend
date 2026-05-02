// src/components/dashboard/MiniChartCard.jsx

/**
 * MiniChartCard
 *
 * A reusable energy flow / trend chart used on both DashboardPage and HistoryPage.
 *
 * Props:
 *   title      {string}   – card heading, default "Energy Flow"
 *   label      {string}   – pill label, default "Last 7 Days"
 *   points     {Array}    – array of { day, mbClass, isToday } objects
 *   svgPath    {string}   – SVG `d` attribute for the decorative curve
 *   className  {string}   – extra classes on the root element
 *
 * The History page variant uses a filled gradient curve (area chart style),
 * while the Dashboard variant uses a simple stroke line.
 * Pass `variant="area"` for the area style, default is "line".
 */

const DEFAULT_POINTS = [
  { day: "M", mbClass: "mb-[10px]", isToday: false },
  { day: "T", mbClass: "mb-[60px]", isToday: false },
  { day: "W", mbClass: "mb-[30px]", isToday: false },
  { day: "T", mbClass: "mb-[45px]", isToday: false },
  { day: "F", mbClass: "mb-[15px]", isToday: false },
  { day: "S", mbClass: "mb-[50px]", isToday: false },
  { day: "S", mbClass: "mb-[20px]", isToday: false },
];

const LINE_PATH  = "M0,80 Q20,20 40,50 T80,30 T100,60";
const AREA_PATH  = "M0,80 Q20,20 40,50 T80,30 T100,60 L100,100 L0,100 Z";

export default function MiniChartCard({
  title     = "Energy Flow",
  label     = "Last 7 Days",
  points    = DEFAULT_POINTS,
  variant   = "line",   // "line" | "area"
  className = "",
}) {
  return (
    <section className={`glass-panel rounded-xl p-6 relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="font-headline-md text-[24px] font-medium leading-snug text-primary">
          {title}
        </h2>
        <div className="bg-secondary/15 text-secondary px-3 py-1 rounded-full font-label-caps text-xs tracking-widest uppercase">
          {label}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 w-full relative flex items-end justify-between px-2 z-10">

        {/* SVG curve */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {variant === "area" && (
            <path
              d={AREA_PATH}
              fill="url(#chartGradient)"
              opacity="0.3"
            />
          )}
          <path
            d={LINE_PATH}
            fill="none"
            stroke="#3e5c45"
            strokeWidth="2"
            className="opacity-50"
          />
          {variant === "area" && (
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"   stopColor="#adcfb2" />
                <stop offset="100%" stopColor="#fcf9f5" stopOpacity="0" />
              </linearGradient>
            </defs>
          )}
        </svg>

        {/* Data point dots */}
        {points.map(({ day, mbClass, isToday }, i) => (
          <div key={i} className="flex flex-col items-center gap-2 z-10">
            <div
              className={`w-2 h-2 rounded-full bg-primary ${mbClass} ${
                isToday ? "shadow-[0_0_15px_rgba(98,87,139,0.6)] border-2 border-surface" : ""
              }`}
            />
            <span
              className={`font-label-caps text-xs tracking-widest uppercase ${
                isToday ? "text-on-surface font-bold" : "text-on-surface-variant"
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}