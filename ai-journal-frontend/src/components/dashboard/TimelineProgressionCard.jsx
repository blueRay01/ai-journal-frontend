// src/components/dashboard/TimelineProgressionCard.jsx
import { useState, useEffect } from "react";

const TIMELINE = [
  {
    id: "meditation",
    time: "07:00 AM",
    title: "Morning Meditation",
    subtitle: "Completed on time · Centered mind",
    status: "done",
  },
  {
    id: "journaling",
    time: "01:00 PM",
    title: "Reflection Journaling",
    subtitle: "Completed late · Mindful moment captured",
    status: "late",
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

function toMinutes(timeStr) {
  const [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// The deadline for a task is the start time of the next task (or Infinity for the last)
function getDeadlineMinutes(index) {
  if (index < TIMELINE.length - 1) {
    return toMinutes(TIMELINE[index + 1].time);
  }
  return Infinity;
}

// Uncheck confirmation dialog
function UncheckDialog({ title, isPastDeadline, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
        onClick={onCancel}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[300px] flex flex-col gap-4 z-10">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[#2a3a2a]">Uncheck "{title}"?</p>
          <p className="text-xs text-[#888880] leading-relaxed">
            {isPastDeadline
              ? <>This task was completed on time. Unchecking it will remove it from your completed entries. If you re-check it, it will be marked as <span className="text-[#c05050] font-medium">late</span>.</>
              : <>This task was completed on time. Unchecking it will remove it from your completed entries. You can still re-check it as <span className="text-[#5a7a5a] font-medium">on time</span> before the next task starts.</>
            }
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-[#5a5a55] bg-[#f2f2ee] rounded-lg hover:bg-[#e8e8e0] transition-colors"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-medium text-white bg-[#2f4a35] rounded-lg hover:bg-[#253d2a] transition-colors"
          >
            Uncheck
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TimelineProgressionCard() {
  const [checked, setChecked] = useState({ meditation: true, journaling: false, "nature-walk": false, evening: false });
  const [wasLate, setWasLate] = useState({ meditation: false, journaling: true, "nature-walk": false, evening: false });
  const [confirmDialog, setConfirmDialog] = useState(null); // { id, title, isPastDeadline } | null
  const [currentTime, setCurrentTime] = useState(nowMinutes());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(nowMinutes()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleCircleClick = (entry) => {
    const index = TIMELINE.findIndex((e) => e.id === entry.id);
    const deadline = getDeadlineMinutes(index);
    const isPastDeadline = deadline < currentTime;
    const isFuture = toMinutes(entry.time) > currentTime && entry.status !== "active";
    if (isFuture) return;

    const isChecked = checked[entry.id];
    const isLate = wasLate[entry.id];

    if (isChecked && !isLate) {
      // Completed on time — confirm before unchecking
      setConfirmDialog({ id: entry.id, title: entry.title, isPastDeadline });
    } else if (isChecked && isLate) {
      // Late entry — just uncheck, stays permanently late on re-check
      setChecked((prev) => ({ ...prev, [entry.id]: false }));
    } else {
      // Unchecked → checking now
      // Late only if the next task's time has already passed, or it was permanently flagged late
      const shouldBeLate = isPastDeadline || wasLate[entry.id];
      setChecked((prev) => ({ ...prev, [entry.id]: true }));
      if (shouldBeLate) {
        setWasLate((prev) => ({ ...prev, [entry.id]: true }));
      }
    }
  };

  const confirmUncheck = () => {
    const { id, isPastDeadline } = confirmDialog;
    setChecked((prev) => ({ ...prev, [id]: false }));
    // Only permanently flag as late if the deadline (next task's time) has already passed
    if (isPastDeadline) {
      setWasLate((prev) => ({ ...prev, [id]: true }));
    }
    setConfirmDialog(null);
  };

  const getEffectiveStatus = (entry) => {
    const index = TIMELINE.findIndex((e) => e.id === entry.id);
    const deadline = getDeadlineMinutes(index);
    const isPastDeadline = deadline < currentTime;
    const isChecked = checked[entry.id];
    const isLate = wasLate[entry.id];

    if (entry.status === "active") {
      if (isChecked) return isLate ? "late-done" : "done";
      return "active";
    }
    if (isChecked) return isLate ? "late-done" : "done";
    if (isPastDeadline || isLate) return "late";
    return "upcoming";
  };

  return (
    <>
      {confirmDialog && (
        <UncheckDialog
          title={confirmDialog.title}
          isPastDeadline={confirmDialog.isPastDeadline}
          onConfirm={confirmUncheck}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      <div className="bg-[#f2f2ee] rounded-2xl p-5 flex flex-col gap-1 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3a3a35] text-base">show_chart</span>
            <span className="text-sm font-medium text-[#2a3a2a]">Timeline Progression</span>
          </div>
          <span className="text-[10px] bg-[#e8e8e0] text-[#888880] px-2 py-0.5 rounded-full">
            AI Curated
          </span>
        </div>

        {/* Entries */}
        <div className="flex flex-col">
          {TIMELINE.map((entry, i) => {
            const effectiveStatus = getEffectiveStatus(entry);
            const isFuture = toMinutes(entry.time) > currentTime && entry.status !== "active";
            const isLateDone = effectiveStatus === "late-done";

            return (
              <div key={entry.id} className="flex gap-3">
                {/* Icon + connector */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    disabled={isFuture}
                    onClick={() => handleCircleClick(entry)}
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center shrink-0
                      transition-all duration-200
                      ${isFuture ? "cursor-not-allowed opacity-50" : "hover:scale-110 cursor-pointer"}
                      ${effectiveStatus === "done" || isLateDone
                        ? isLateDone ? "bg-[#c05050] border-2 border-[#c05050]" : "bg-[#5a7a5a] border-2 border-[#5a7a5a]"
                        : effectiveStatus === "late"
                        ? "bg-[#fce8e8] border-2 border-[#e08080]"
                        : effectiveStatus === "active"
                        ? "bg-[#2f4a35] border-2 border-[#2f4a35]"
                        : "border-2 border-[#ddddd5] bg-[#f2f2ee]"
                      }
                    `}
                  >
                    {(effectiveStatus === "done") && (
                      <span className="material-symbols-outlined text-white text-base leading-none">check</span>
                    )}
                    {isLateDone && (
                      <span className="material-symbols-outlined text-white text-base leading-none">check</span>
                    )}
                    {effectiveStatus === "late" && (
                      <span className="material-symbols-outlined text-[#c05050] text-base leading-none">cancel</span>
                    )}
                    {effectiveStatus === "active" && (
                      <span className="material-symbols-outlined text-white text-base leading-none">bolt</span>
                    )}
                  </button>

                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-[#ddddd5] my-1 min-h-[24px]" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pb-5 transition-all duration-300 ${
                    effectiveStatus === "active"
                      ? "bg-[#2f4a35] rounded-xl p-3 mb-2 -mt-0.5"
                      : effectiveStatus === "late" || isLateDone
                      ? "bg-[#fef0f0] rounded-xl p-3 mb-2 -mt-0.5"
                      : "pt-0.5"
                  }`}
                >
                  {/* Time row */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold ${
                      effectiveStatus === "active" ? "text-[#b8d4bc]"
                      : effectiveStatus === "late" || isLateDone ? "text-[#c05050]"
                      : "text-[#5a5a55]"
                    }`}>
                      {entry.time}
                    </span>
                    {(effectiveStatus === "late" || isLateDone) && (
                      <span className="text-[9px] font-semibold bg-[#f8c8c8] text-[#c05050] px-2 py-0.5 rounded-full">
                        {isLateDone ? "Completed late" : "Marked as late"}
                      </span>
                    )}
                    {effectiveStatus === "active" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </div>

                  {/* Title */}
                  <p className={`text-sm font-medium leading-snug ${
                    effectiveStatus === "active" ? "text-white"
                    : effectiveStatus === "late" ? "text-[#c05050] line-through"
                    : isLateDone ? "text-[#c05050]"
                    : "text-[#2a3a2a]"
                  }`}>
                    {entry.title}
                  </p>

                  {/* Subtitle */}
                  <p className={`text-xs mt-0.5 ${
                    effectiveStatus === "active" ? "text-[#9ab89e]"
                    : effectiveStatus === "late" || isLateDone ? "text-[#c07070]"
                    : "text-[#888880]"
                  }`}>
                    {entry.subtitle}
                  </p>

                  {/* Active CTA */}
                  {effectiveStatus === "active" && (
                    <button
                      onClick={() => handleCircleClick(entry)}
                      className="mt-2 bg-[#1a2e1f] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-[#0f1f13] transition-colors active:scale-95"
                    >
                      {entry.cta}
                      <span className="material-symbols-outlined text-[12px]">timer</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}