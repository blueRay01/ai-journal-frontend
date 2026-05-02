// src/pages/CheckInPage.jsx
import DashboardHeader from "../components/layout/DashboardHeader";
import BottomNav from "../components/layout/BottomNav";
import ExerciseToggle from "../components/checkin/ExerciseToggle";
import SliderField from "../components/checkin/SliderField";
import WinsTextArea from "../components/checkin/WinsTextArea";
import { useState } from "react";

export default function CheckInPage({ onNavigate }) {
    const [winsText, setWinsText] = useState("");
    const hasText = winsText.trim().length > 0;
  return (
    <div className="text-on-surface font-body-md min-h-screen relative overflow-x-hidden pb-40">

      {/* Background — unified with all other pages */}
      <div className="aura-top-right" />
      <div className="aura-bottom-left" />

      <DashboardHeader />

      <main className="max-w-[1000px] mx-auto px-4 md:px-8 mt-4 md:mt-12">

        {/* Page heading */}
        <div className="mb-16 text-center">
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary mb-2">
            Daily Check-in
          </h1>
          <p className="text-[18px] text-on-surface-variant leading-relaxed">
            Take a moment to reflect on your day.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-fixed/50 text-on-secondary-container text-[13px] font-medium border border-secondary-fixed-dim/30 shadow-sm">
            <span className="material-symbols-outlined text-[16px] mr-2">calendar_today</span>
            October 24, 2023
          </div>
        </div>

        {/* Open book frame */}
        <div className="relative w-full max-w-4xl mx-auto z-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">

          {/* Stacked pages underneath */}
          <div className="book-page-under-3" />
          <div className="book-page-under-2" />
          <div className="book-page-under-1" />

          {/* Book binding line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-outline-variant/10 via-outline-variant/40 to-outline-variant/10 hidden md:block z-20 shadow-inner" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative z-10">

            {/* Left page */}
            <div className="glass-panel rounded-2xl md:rounded-r-none p-6 md:p-10 min-h-[500px]">
              <div className="space-y-10">
                <ExerciseToggle />
                <SliderField
                  icon="bedtime"
                  label="Sleep Quality"
                  badge="REST"
                  defaultVal={4}
                  markers={["Poor", "Fair", "Good", "Great", "Excellent"]}
                />
                <SliderField
                  icon="mood"
                  label="Mood"
                  badge="FEELING"
                  defaultVal={3}
                  markers={["Low", "Okay", "Neutral", "Good", "High"]}
                />
              </div>
            </div>

            {/* Right page */}
            <div className="glass-panel rounded-2xl md:rounded-l-none p-6 md:p-10 min-h-[500px] flex flex-col">
              <div className="space-y-10 flex-grow">
                <SliderField
                  icon="waves"
                  label="Stress Level"
                  defaultVal={2}
                  markers={["Calm", "Mild", "Moderate", "High", "Overwhelmed"]}
                />
                <WinsTextArea onChange={setWinsText} />
              </div>

              {/* Submit */}
              <div className="mt-10 flex justify-end">
                <button
                onClick={() => hasText && console.log("submit")}
                className={`relative z-10 text-[13px] font-medium px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    hasText
                    ? "bg-primary text-on-primary shadow-[0_10px_20px_rgba(39,68,47,0.3)] hover:bg-primary-fixed-variant hover:shadow-[0_0_0_4px_rgba(39,68,47,0.15)] cursor-pointer"
                    : "bg-surface-variant text-outline cursor-not-allowed"
                }`}
                >
                Submit Entry
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activePage="checkin" onNavigate={onNavigate} />
    </div>
  );
}