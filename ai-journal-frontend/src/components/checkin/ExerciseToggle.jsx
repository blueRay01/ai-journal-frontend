// src/components/checkin/ExerciseToggle.jsx
import { useState } from "react";

export default function ExerciseToggle() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-6">
      <div>
        <h3 className="font-display text-[24px] font-medium text-primary flex items-center gap-2">
          <span className="material-symbols-outlined">fitness_center</span>
          Exercise
        </h3>
        <p className="text-xs text-on-surface-variant mt-1">Did you move your body today?</p>
      </div>

      {/* Toggle */}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 shadow-inner ${
          checked ? "bg-primary" : "bg-surface-dim"
        }`}
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all duration-300 ${
            checked ? "left-[calc(100%-28px)]" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}