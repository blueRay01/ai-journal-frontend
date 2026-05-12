// src/components/insight/InsightPanel.jsx
import InsightBadge from "./InsightBadge";
import InsightActions from "./InsightActions";

function formatTimeLabel(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number") return `${value}:00`;
  return "";
}

export default function InsightPanel({ title, content, timeline, showTomorrowPlanToday, entryDate }) {
  const safeTitle = title || "Your AI Insight";
  const safeContent = content || "We're generating your insight. This usually takes a moment…";
  const hasTimeline = Array.isArray(timeline) && timeline.length > 0;
  
  // Determine if we should show tomorrow's plan today
  const shouldShowTomorrowPlanToday = showTomorrowPlanToday && hasTimeline;
  
  // Get status message for timeline
  const getTimelineStatus = () => {
    if (shouldShowTomorrowPlanToday) return "Available today";
    return "Available tomorrow";
  };
  
  // Get timeline title
  const getTimelineTitle = () => {
    if (shouldShowTomorrowPlanToday) return "Today's plan";
    return "Tomorrow's timeline";
  };

  return (
    <div className="glass-panel p-8 md:p-12 rounded-4xl flex flex-col gap-10" style={{ background: 'rgba(253, 250, 246, 0.6)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.9)', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.05)' }}>
      <InsightBadge />
      
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-4xl md:text-5xl text-primary font-medium tracking-tight">
          {safeTitle}
        </h1>
        <p className="font-body-lg text-lg md:text-xl text-on-surface-variant leading-relaxed">
          {safeContent}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-primary tracking-wide">
            {getTimelineTitle()}
          </h2>
          {!hasTimeline && (
            <span className="text-xs text-on-surface-variant">
              {getTimelineStatus()}
            </span>
          )}
          {hasTimeline && (
            <span className="text-xs text-on-surface-variant">
              {getTimelineStatus()}
            </span>
          )}
        </div>

        {hasTimeline && (
          <ol className="flex flex-col gap-3">
            {timeline.map((item, idx) => (
              <li
                key={`${item?.time || ""}-${item?.title || ""}-${idx}`}
                className="flex gap-3 rounded-2xl border border-primary/10 bg-white/50 hover:bg-white/70 cursor-pointer transition-colors px-4 py-3"
              >
                <div className="shrink-0 w-[84px]">
                  <p className="text-xs font-semibold text-primary">
                    {formatTimeLabel(item?.time)}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-on-surface">
                    {item?.title || "Activity"}
                  </p>
                  {item?.subtitle && (
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                  {shouldShowTomorrowPlanToday && (
                    <p className="text-xs text-primary mt-1 font-medium">
                      Available today
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      
      <InsightActions />
    </div>
  );
}