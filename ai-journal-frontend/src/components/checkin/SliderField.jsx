// src/components/checkin/SliderField.jsx
import { useState } from "react";

/**
 * SliderField
 *
 * Props:
 *   icon       {string}    – Material Symbols icon name
 *   label      {string}    – field heading, e.g. "Sleep Quality"
 *   badge      {string}    – optional pill label, e.g. "REST"
 *   min        {number}    – default 1
 *   max        {number}    – default 5
 *   defaultVal {number}    – default 3
 *   markers    {string[]}  – labels under the track, e.g. ["Poor", ..., "Excellent"]
 */
export default function SliderField({
  icon,
  label,
  badge,
  min = 1,
  max = 5,
  defaultVal = 3,
  markers = [],
}) {
  const [value, setValue] = useState(defaultVal);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h3 className="font-display text-[24px] font-medium text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">{icon}</span>
          {label}
        </h3>
        {badge && (
          <span className="font-label-caps text-xs tracking-widest uppercase font-bold text-on-surface-variant bg-surface px-2 py-1 rounded shadow-sm">
            {badge}
          </span>
        )}
      </div>

      <div className="px-2 pt-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full drop-shadow-sm accent-primary"
        />
        {markers.length > 0 && (
          <div className="flex justify-between text-xs text-on-surface-variant mt-3 px-1">
            {markers.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}