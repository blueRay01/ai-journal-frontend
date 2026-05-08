// src/components/dashboard/TimelineProgressionCard.jsx

const TIMELINE = [
  {
    time: "07:00 AM",
    title: "Morning Meditation",
    subtitle: "Completed on time · Centered mind",
    status: "done", // done | late | active | upcoming
  },
  {
    time: "01:00 PM",
    title: "Reflection Journaling",
    subtitle: "Completed late · Mindful moment captured",
    status: "late",
    badge: "Marked as late",
  },
  {
    time: "05:30 PM",
    title: "Nature Walk",
    subtitle: "Active now · 30 mins to disconnect",
    status: "active",
    cta: "CURRENT FOCUS",
  },
  {
    time: "09:30 PM",
    title: "Evening Wind Down",
    subtitle: "Routine · Prepare for rest",
    status: "upcoming",
  },
];

function StatusIcon({ status }) {
  if (status === "done")
    return (
      <div className="w-7 h-7 rounded-full border-2 border-[#c8c8c0] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#5a7a5a] text-base leading-none">
          check
        </span>
      </div>
    );
  if (status === "late")
    return (
      <div className="w-7 h-7 rounded-full bg-[#fce8e8] border-2 border-[#e08080] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#c05050] text-base leading-none">
          cancel
        </span>
      </div>
    );
  if (status === "active")
    return (
      <div className="w-7 h-7 rounded-full bg-[#2f4a35] border-2 border-[#2f4a35] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-white text-base leading-none">
          bolt
        </span>
      </div>
    );
  // upcoming
  return (
    <div className="w-7 h-7 rounded-full border-2 border-[#ddddd5] bg-[#f2f2ee] shrink-0" />
  );
}

export default function TimelineProgressionCard() {
  return (
    <div className="md:col-span-5 bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-1 row-span-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3a3a35] text-base">
            show_chart
          </span>
          <span className="text-sm font-medium text-[#2a3a2a]">
            Timeline Progression
          </span>
        </div>
        <span className="text-[10px] bg-[#e8e8e0] text-[#888880] px-2 py-0.5 rounded-full">
          AI Curated
        </span>
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-0">
        {TIMELINE.map((entry, i) => (
          <div key={i} className="flex gap-3">
            {/* Left: icon + connector line */}
            <div className="flex flex-col items-center">
              <StatusIcon status={entry.status} />
              {i < TIMELINE.length - 1 && (
                <div className="w-px flex-1 bg-[#ddddd5] my-1 min-h-[24px]" />
              )}
            </div>

            {/* Right: content */}
            <div
              className={`flex-1 pb-5 ${
                entry.status === "active"
                  ? "bg-[#2f4a35] rounded-xl p-3 mb-2 -mt-0.5"
                  : entry.status === "late"
                  ? "bg-[#fef0f0] rounded-xl p-3 mb-2 -mt-0.5"
                  : "pt-0.5"
              }`}
            >
              {/* Time row */}
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`text-xs font-semibold ${
                    entry.status === "active"
                      ? "text-[#b8d4bc]"
                      : entry.status === "late"
                      ? "text-[#c05050]"
                      : "text-[#5a5a55]"
                  }`}
                >
                  {entry.time}
                </span>
                {entry.badge && (
                  <span className="text-[9px] font-semibold bg-[#f8c8c8] text-[#c05050] px-2 py-0.5 rounded-full">
                    {entry.badge}
                  </span>
                )}
                {entry.status === "active" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </div>

              {/* Title */}
              <p
                className={`text-sm font-medium leading-snug ${
                  entry.status === "active"
                    ? "text-white"
                    : entry.status === "late"
                    ? "text-[#c05050] line-through"
                    : "text-[#2a3a2a]"
                }`}
              >
                {entry.title}
              </p>

              {/* Subtitle */}
              <p
                className={`text-xs mt-0.5 ${
                  entry.status === "active"
                    ? "text-[#9ab89e]"
                    : entry.status === "late"
                    ? "text-[#c07070]"
                    : "text-[#888880]"
                }`}
              >
                {entry.subtitle}
              </p>

              {/* CTA button */}
              {entry.cta && (
                <button className="mt-2 bg-[#1a2e1f] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  {entry.cta}
                  <span className="material-symbols-outlined text-[12px]">
                    timer
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
