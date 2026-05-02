// src/components/dashboard/EnergyFlowCard.jsx

// mb-* values drive each dot's vertical position on the faux chart.
// Adjust these to change the "shape" of the line.
const DATA_POINTS = [
  { day: "M", mbClass: "mb-12",  isToday: false },
  { day: "T", mbClass: "mb-16",  isToday: false },
  { day: "W", mbClass: "mb-8",   isToday: false },
  { day: "T", mbClass: "mb-20",  isToday: false },
  { day: "F", mbClass: "mb-24",  isToday: false },
  { day: "S", mbClass: "mb-14",  isToday: false },
  { day: "S", mbClass: "mb-[72px]", isToday: true  },
];

export default function EnergyFlowCard() {
  return (
    <div className="md:col-span-8 bg-surface-container-low/85 backdrop-blur-xl border border-white/50 rounded-xl p-6 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-on-surface text-[24px] font-medium leading-snug">
          Energy Flow
        </h3>
        <span className="font-label-caps text-on-surface-variant bg-surface-variant/50 px-3 py-1 rounded-full text-xs tracking-widest uppercase">
          Last 7 Days
        </span>
      </div>

      {/* Chart area */}
      <div className="flex-grow flex items-end justify-between gap-2 h-48 relative">

        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
          <div className="border-b border-outline-variant/30 w-full h-0" />
          <div className="border-b border-outline-variant/30 w-full h-0" />
          <div className="border-b border-outline-variant/30 w-full h-0" />
        </div>

        {/* Dots + day labels */}
        <div className="w-full flex justify-between items-end h-full pb-4 px-2 relative z-10">
          {DATA_POINTS.map(({ day, mbClass, isToday }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              {isToday ? (
                <div
                  className={`w-4 h-4 rounded-full bg-secondary ${mbClass} shadow-[0_0_15px_rgba(98,87,139,0.6)] border-2 border-surface`}
                />
              ) : (
                <div
                  className={`w-3 h-3 rounded-full bg-primary ${mbClass} shadow-[0_0_10px_rgba(39,68,47,0.5)]`}
                />
              )}
              <span
                className={`font-label-sm text-xs ${
                  isToday ? "text-on-surface font-bold" : "text-on-surface-variant"
                }`}
              >
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative SVG curve */}
        <svg
          className="absolute inset-0 h-[80%] w-full top-[10%] pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="text-primary/30"
            d="M 5,60 C 20,40 35,70 50,20 C 65,-10 80,45 95,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}