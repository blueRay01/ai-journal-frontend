// src/components/dashboard/TimelineProgressionCard.jsx
import { useState } from "react";

const TIMELINE = [
  {
    id: "meditation",
    time: "07:00 AM",
    title: "Morning Meditation",
    subtitle: "Completed on time · Centered mind",
    status: "done", // done | late | active | upcoming
  },
  {
    id: "journaling",
    time: "01:00 PM",
    title: "Reflection Journaling",
    subtitle: "Completed late · Mindful moment captured",
    status: "late",
    badge: "Marked as late",
  },
  {
    id: "nature-walk",
    time: "05:30 PM",
    title: "Nature Walk",
    subtitle: "Active now · 30 mins to disconnect",
    status: "active",
    cta: "CURRENT FOCUS",
  },
  {
    id: "evening",
    time: "09:30 PM",
    title: "Evening Wind Down",
    subtitle: "Routine · Prepare for rest",
    status: "upcoming",
  },
];

function StatusIcon({ entry, checked, onChange, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    onChange(!checked);
  };

  // Determine if item should be marked as late
  const getTimeInMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
    return hours24 * 60 + minutes;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  };

  const currentTime = getCurrentTime();
  const entryTime = getTimeInMinutes(entry.time);
  const isPastTime = entryTime < currentTime && entry.status !== "active";
  const isFutureTime = entryTime > currentTime && entry.status !== "done";
  const shouldShowAsLate = isPastTime && !checked && entry.status !== "done";
  const shouldBeDisabled = disabled || isFutureTime;

  // Interactive checkbox with time-based logic
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={shouldBeDisabled}
      className={`
        w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
        ${shouldBeDisabled ? "" : "hover:scale-110"}
        ${entry.status === "done" && checked
          ? "bg-[#5a7a5a] border-2 border-[#5a7a5a]"
          : entry.status === "done" && !checked
          ? "border-2 border-[#c8c8c0] bg-white hover:border-[#5a7a5a]"
          : shouldShowAsLate
          ? "bg-[#fce8e8] border-2 border-[#e08080] hover:border-[#c05050]"
          : entry.status === "late" && checked
          ? "bg-[#c05050] border-2 border-[#c05050]"
          : entry.status === "late" && !checked
          ? "bg-[#fce8e8] border-2 border-[#e08080] hover:border-[#c05050]"
          : entry.status === "active"
          ? "bg-[#2f4a35] border-2 border-[#2f4a35]"
          : isFutureTime
          ? "border-2 border-[#ddddd5] bg-[#f2f2ee] cursor-not-allowed"
          : "border-2 border-[#ddddd5] bg-[#f2f2ee] hover:border-[#5a7a5a]"
        }
        ${shouldBeDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
      `}
    >
      {checked ? (
        <span className="material-symbols-outlined text-white text-base leading-none">
          check
        </span>
      ) : shouldShowAsLate || (entry.status === "late" && !checked) ? (
        <span className="material-symbols-outlined text-[#c05050] text-base leading-none">
          cancel
        </span>
      ) : entry.status === "active" ? (
        <span className="material-symbols-outlined text-white text-base leading-none">
          bolt
        </span>
      ) : null}
    </button>
  );
}

export default function TimelineProgressionCard() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleToggle = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Get current time to determine if items are late
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes; // Total minutes since midnight
  };

  const getTimeInMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
    return hours24 * 60 + minutes;
  };

  const currentTime = getCurrentTime();

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
          <div key={entry.id} className="flex gap-3">
            {/* Left: icon + connector line */}
            <div className="flex flex-col items-center">
              <StatusIcon 
                entry={entry}
                checked={!!checkedItems[entry.id]}
                onChange={() => handleToggle(entry.id)}
                disabled={entry.status === "active"}
              />
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
