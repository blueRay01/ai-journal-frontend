// src/components/checkin/WinsTextArea.jsx
import { useState } from "react";

export default function WinsTextArea({ onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="space-y-4 flex-grow flex flex-col h-full">
      <h3 className="font-display text-[24px] font-medium text-primary flex items-center gap-2">
        <span className="material-symbols-outlined">edit_note</span>
        Wins
      </h3>
      <div className="glass-input rounded-xl flex-grow h-48 md:h-full p-1 relative shadow-inner">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Any wins today? Big or small, write them down..."
          className="w-full h-full bg-transparent border-none resize-none p-4 text-[16px] leading-relaxed text-on-surface focus:ring-0 placeholder:text-outline-variant/70 outline-none"
        />
      </div>
    </div>
  );
}