import { useState, useEffect } from "react";

function toMinutes(timeStr) {
  if (!timeStr) return 0;
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

function getDeadlineMinutes(index, timeline) {
  if (index < timeline.length - 1) return toMinutes(timeline[index + 1].time);
  return Infinity;
}

function UncheckDialog({ title, isPastDeadline, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" onClick={onCancel} />
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
          <button onClick={onCancel} className="px-4 py-2 text-xs font-medium text-[#5a5a55] bg-[#f2f2ee] rounded-lg hover:bg-[#e8e8e0] transition-colors">
            Keep it
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-xs font-medium text-white bg-[#2f4a35] rounded-lg hover:bg-[#253d2a] transition-colors">
            Uncheck
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TimelineProgressionCard({ timeline = [], entryDate = null, onProgressChange, onActiveFocusChange }) {
  const [checked, setChecked] = useState({});
  const [wasLate, setWasLate] = useState({});
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [currentTime, setCurrentTime] = useState(nowMinutes());

  const isUnlocked = (() => {
    if (!entryDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entry = new Date(entryDate);
    entry.setHours(0, 0, 0, 0);
    return entry < today;
  })();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowLabel = tomorrow.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(nowMinutes()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeline.length === 0) return;
    const init = {};
    timeline.forEach((_, i) => { init[i] = false; });
    setChecked(init);
    setWasLate(init);
  }, [timeline]);

  // Report progress to parent whenever checked state changes
  useEffect(() => {
    if (!onProgressChange || timeline.length === 0) return;
    const completedCount = Object.values(checked).filter(Boolean).length;
    const pct = Math.round((completedCount / timeline.length) * 100);
    onProgressChange(pct);
  }, [checked, timeline, onProgressChange]);

  // Report active task to parent whenever time or timeline changes
  useEffect(() => {
    if (!onActiveFocusChange || timeline.length === 0 || !isUnlocked) return;
    const activeIndex = timeline.findIndex((entry, i) => {
      const start = toMinutes(entry.time);
      const end = i < timeline.length - 1 ? toMinutes(timeline[i + 1].time) : Infinity;
      return start <= currentTime && currentTime < end;
    });
    if (activeIndex !== -1) {
      onActiveFocusChange({
        title: timeline[activeIndex].title,
        subtitle: timeline[activeIndex].subtitle || null,
      });
    } else {
      onActiveFocusChange(null);
    }
  }, [currentTime, timeline, isUnlocked, onActiveFocusChange]);

  const getEffectiveStatus = (index) => {
    const entry = timeline[index];
    const deadline = getDeadlineMinutes(index, timeline);
    const isPastDeadline = deadline < currentTime;
    const startMinutes = toMinutes(entry.time);
    const isActive = startMinutes <= currentTime && (index === timeline.length - 1 || toMinutes(timeline[index + 1].time) > currentTime);
    const isCheckedNow = checked[index];
    const isLate = wasLate[index];

    if (isCheckedNow) return isLate ? "late-done" : "done";
    if (isActive) return "active";
    if (isPastDeadline || isLate) return "late";
    if (startMinutes > currentTime) return "upcoming";
    return "upcoming";
  };

  const handleCircleClick = (index) => {
    if (!isUnlocked) return;
    const entry = timeline[index];
    const deadline = getDeadlineMinutes(index, timeline);
    const isPastDeadline = deadline < currentTime;
    const isFuture = toMinutes(entry.time) > currentTime && getEffectiveStatus(index) !== "active";
    if (isFuture) return;

    const isCheckedNow = checked[index];
    const isLate = wasLate[index];

    if (isCheckedNow && !isLate) {
      setConfirmDialog({ id: index, title: entry.title, isPastDeadline });
    } else if (isCheckedNow && isLate) {
      setChecked((prev) => ({ ...prev, [index]: false }));
    } else {
      const shouldBeLate = isPastDeadline || wasLate[index];
      setChecked((prev) => ({ ...prev, [index]: true }));
      if (shouldBeLate) setWasLate((prev) => ({ ...prev, [index]: true }));
    }
  };

  const confirmUncheck = () => {
    const { id, isPastDeadline } = confirmDialog;
    setChecked((prev) => ({ ...prev, [id]: false }));
    if (isPastDeadline) setWasLate((prev) => ({ ...prev, [id]: true }));
    setConfirmDialog(null);
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3a3a35] text-base">show_chart</span>
            <div>
              <span className="text-sm font-medium text-[#2a3a2a]">Tomorrow's Plan</span>
              <p className="text-[10px] text-[#888880] mt-0.5">{tomorrowLabel}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium ${
            isUnlocked
              ? "bg-green-100 text-green-700"
              : "bg-amber-50 text-amber-600 border border-amber-200"
          }`}>
            <span className="material-symbols-outlined text-[13px]">
              {isUnlocked ? "lock_open" : "lock"}
            </span>
            {isUnlocked ? "Active" : "Unlocks tomorrow"}
          </div>
        </div>

        {timeline.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-3">
            <span className="material-symbols-outlined text-[40px] text-[#c8d8c8]">event_note</span>
            <p className="text-[13px] text-[#8a9a8a] leading-relaxed max-w-[180px]">
              Complete today's check-in to get your AI-curated plan for tomorrow.
            </p>
          </div>
        )}

        {timeline.length > 0 && !isUnlocked && (
          <div className="relative flex flex-col">
            <div className="absolute inset-0 z-10 rounded-xl flex flex-col items-center justify-center gap-2"
              style={{ background: "rgba(242,242,238,0.75)", backdropFilter: "blur(4px)" }}>
              <span className="material-symbols-outlined text-[32px] text-[#8a9a8a]">lock</span>
              <p className="text-[12px] text-[#8a9a8a] font-medium">Available tomorrow</p>
              <p className="text-[10px] text-[#aaa] text-center px-4">
                Your AI-curated plan will unlock at midnight
              </p>
            </div>
            <div style={{ filter: "blur(2px)", pointerEvents: "none", userSelect: "none" }}>
              {timeline.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full border-2 border-[#ddddd5] bg-[#f2f2ee] flex items-center justify-center shrink-0" />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#ddddd5] my-1 min-h-[24px]" />}
                  </div>
                  <div className="flex-1 pb-5 pt-0.5">
                    <span className="text-xs font-semibold text-[#5a5a55]">{entry.time}</span>
                    <p className="text-sm font-medium text-[#2a3a2a] leading-snug">{entry.title}</p>
                    {entry.subtitle && <p className="text-xs text-[#888880] mt-0.5">{entry.subtitle}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {timeline.length > 0 && isUnlocked && (
          <div className="flex flex-col">
            {timeline.map((entry, i) => {
              const effectiveStatus = getEffectiveStatus(i);
              const isFuture = toMinutes(entry.time) > currentTime && effectiveStatus !== "active";
              const isLateDone = effectiveStatus === "late-done";

              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      disabled={isFuture}
                      onClick={() => handleCircleClick(i)}
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
                      {(effectiveStatus === "done" || isLateDone) && (
                        <span className="material-symbols-outlined text-white text-base leading-none">check</span>
                      )}
                      {effectiveStatus === "late" && (
                        <span className="material-symbols-outlined text-[#c05050] text-base leading-none">cancel</span>
                      )}
                      {effectiveStatus === "active" && (
                        <span className="material-symbols-outlined text-white text-base leading-none">bolt</span>
                      )}
                    </button>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-[#ddddd5] my-1 min-h-[24px]" />}
                  </div>

                  <div className={`flex-1 pb-5 transition-all duration-300 ${
                    effectiveStatus === "active" ? "bg-[#2f4a35] rounded-xl p-3 mb-2 -mt-0.5"
                    : effectiveStatus === "late" || isLateDone ? "bg-[#fef0f0] rounded-xl p-3 mb-2 -mt-0.5"
                    : "pt-0.5"
                  }`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-semibold ${
                        effectiveStatus === "active" ? "text-[#b8d4bc]"
                        : effectiveStatus === "late" || isLateDone ? "text-[#c05050]"
                        : "text-[#5a5a55]"
                      }`}>{entry.time}</span>
                      {(effectiveStatus === "late" || isLateDone) && (
                        <span className="text-[9px] font-semibold bg-[#f8c8c8] text-[#c05050] px-2 py-0.5 rounded-full">
                          {isLateDone ? "Completed late" : "Marked as late"}
                        </span>
                      )}
                      {effectiveStatus === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </div>

                    <p className={`text-sm font-medium leading-snug ${
                      effectiveStatus === "active" ? "text-white"
                      : effectiveStatus === "late" ? "text-[#c05050] line-through"
                      : isLateDone ? "text-[#c05050]"
                      : "text-[#2a3a2a]"
                    }`}>{entry.title}</p>

                    {entry.subtitle && (
                      <p className={`text-xs mt-0.5 ${
                        effectiveStatus === "active" ? "text-[#9ab89e]"
                        : effectiveStatus === "late" || isLateDone ? "text-[#c07070]"
                        : "text-[#888880]"
                      }`}>{entry.subtitle}</p>
                    )}

                    {effectiveStatus === "active" && (
                      <button
                        onClick={() => handleCircleClick(i)}
                        className="mt-2 bg-[#1a2e1f] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-[#0f1f13] transition-colors active:scale-95"
                      >
                        CURRENT FOCUS
                        <span className="material-symbols-outlined text-[12px]">timer</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}