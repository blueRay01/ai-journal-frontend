// src/components/dashboard/RecentEntryCard.jsx

/**
 * RecentEntryCard
 *
 * Props:
 *   date      {string}  – e.g. "Yesterday" or "Oct 24"
 *   mood      {string}  – e.g. "Peaceful"
 *   icon      {string}  – Material Symbols icon name
 *   iconBg    {string}  – Tailwind bg class, e.g. "bg-primary-container/20"
 *   iconColor {string}  – Tailwind text class, e.g. "text-primary"
 *   onClick   {func}    – optional click handler
 */
export default function RecentEntryCard({
  date,
  mood,
  icon,
  iconBg = "bg-primary-container/20",
  iconColor = "text-primary",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="md:col-span-6 bg-surface-container-low/85 backdrop-blur-xl border border-white/50 rounded-xl p-6 shadow-sm flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer"
    >
      {/* Icon bubble */}
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
      </div>

      {/* Text */}
      <div>
        <p className="font-label-sm text-on-surface-variant text-xs font-medium">{date}</p>
        <h4 className="font-headline-md text-on-surface text-[24px] font-medium leading-snug">
          {mood}
        </h4>
      </div>

      {/* Chevron */}
      <div className="ml-auto">
        <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
      </div>
    </div>
  );
}