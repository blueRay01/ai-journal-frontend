// src/components/dashboard/EntryRow.jsx
import { useMemo, useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const summary = useMemo(() => {
    const text = (preview ?? "").trim();
    if (!text) return "";
    const short = text.length > 120 ? `${text.slice(0, 120).trim()}…` : text;
    return short;
  }, [preview]);

  const handleToggle = () => {
    setIsExpanded((v) => !v);
    onClick?.();
  };

  return (
    <div className="glass-panel rounded-lg border-primary/5">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full p-4 flex items-center justify-between group hover:bg-surface-container-low/50 transition-colors cursor-pointer text-left rounded-lg"
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Emoji bubble */}
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0">
            {emoji}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
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
            <p
              className={[
                "text-on-surface-variant text-sm mt-1 leading-relaxed",
                isExpanded ? "line-clamp-2" : "truncate",
              ].join(" ")}
            >
              {preview}
            </p>
          </div>
        </div>

        <span
          className={[
            "material-symbols-outlined text-outline group-hover:text-primary transition-colors shrink-0",
            "transform transition-transform duration-200",
            isExpanded ? "rotate-90" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          chevron_right
        </span>
      </button>

      <div
        className={[
          "px-4 pb-4",
          "transition-[max-height,opacity] duration-200 ease-out",
          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
          "overflow-hidden",
        ].join(" ")}
      >
        <div className="pt-2 border-t border-outline-variant/20 text-sm text-on-surface-variant">
          {summary}
        </div>
      </div>
    </div>
  );
}