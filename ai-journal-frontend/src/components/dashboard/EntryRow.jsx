// src/components/dashboard/EntryRow.jsx

/**
 * EntryRow
 *
 * A single row in the log history list.
 *
 * Props:
 *   emoji      {string}  – e.g. "🌤️"
 *   timestamp  {string}  – e.g. "Today, 9:00 AM"
 *   score      {number}  – e.g. 8
 *   preview    {string}  – short journal text preview
 *   onClick    {func}    – optional click handler
 */

function scoreVariant(score) {
  // High score → secondary (purple), low score → tertiary (warm brown)
  return score >= 6
    ? "bg-secondary/15 text-secondary"
    : "bg-tertiary-container/20 text-tertiary";
}

export default function EntryRow({ emoji, timestamp, score, preview, onClick }) {
  return (
    <div
      onClick={onClick}
      className="glass-panel rounded-lg p-4 flex items-center justify-between group hover:bg-surface-container-low/50 transition-colors cursor-pointer border-primary/5"
    >
      <div className="flex items-center gap-4">
        {/* Emoji bubble */}
        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-xl">
          {emoji}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-primary font-semibold text-[13px]">
              {timestamp}
            </span>
            <div
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${scoreVariant(
                score
              )}`}
            >
              Score {score}
            </div>
          </div>
          <p className="text-on-surface-variant text-sm truncate max-w-[200px] md:max-w-md mt-1 leading-relaxed">
            {preview}
          </p>
        </div>
      </div>

      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
        chevron_right
      </span>
    </div>
  );
}