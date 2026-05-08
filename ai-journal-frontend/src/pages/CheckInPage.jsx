// src/pages/CheckInPage.jsx
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";
import { useState } from "react";
import DashboardHeader from "../components/layout/DashboardHeader";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

  .handwritten-text {
    font-family: 'Caveat', cursive;
    font-size: 18px;
    line-height: 1.6;
  }

  @keyframes handwritten-check {
    0% { stroke-dasharray: 0 100; opacity: 0; }
    50% { opacity: 1; }
    100% { stroke-dasharray: 100 0; opacity: 1; }
  }

  .animate-handwritten-check path:first-child {
    animation: handwritten-check 0.3s ease-in-out;
  }

  .animate-handwritten-check path:last-child {
    animation: handwritten-check 0.3s ease-in-out 0.1s both;
  }

  .exercise-checkbox:checked + label,
  .sleep-checkbox:checked + label,
  .mood-checkbox:checked + label,
  .stress-checkbox:checked + label {
    background-color: transparent;
    border-color: transparent;
  }

  .aura-tl {
    position: fixed;
    top: -10%;
    left: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(173,207,178,0.3) 0%, rgba(238,244,232,0) 70%);
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
  }

  .aura-br {
    position: fixed;
    bottom: -10%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(204,190,250,0.15) 0%, rgba(245,245,239,0) 70%);
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    pointer-events: none;
  }

  .book-page-under-1 {
    position: absolute;
    inset: 0;
    background: #FDFAF6;
    border-radius: 1rem;
    transform: rotate(-1deg) scale(0.99) translateY(4px) translateX(-2px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    z-index: -1;
    border: 1px solid rgba(0,0,0,0.03);
  }

  .book-page-under-2 {
    position: absolute;
    inset: 0;
    background: #FDFAF6;
    border-radius: 1rem;
    transform: rotate(1.5deg) scale(0.98) translateY(8px) translateX(2px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
    z-index: -2;
    border: 1px solid rgba(0,0,0,0.03);
  }

  .book-page-under-3 {
    position: absolute;
    inset: 0;
    background: #FDFAF6;
    border-radius: 1rem;
    transform: rotate(-0.5deg) scale(0.97) translateY(14px);
    box-shadow: 0 40px 80px -10px rgba(0,0,0,0.25);
    z-index: -3;
    border: 1px solid rgba(0,0,0,0.03);
  }

  .glass-input:focus-within {
    box-shadow: 0 0 0 4px rgba(209, 196, 255, 0.3);
    border-color: rgba(98, 87, 139, 0.3);
  }

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #27442f;
    cursor: pointer;
    margin-top: -10px;
    box-shadow: 0 2px 8px rgba(39,68,47,0.4);
    border: 2px solid #ffffff;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #e5e2de;
    border-radius: 3px;
    border: 1px solid #c2c8c0;
  }

  input[type="range"]::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #27442f;
    cursor: pointer;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 8px rgba(39,68,47,0.4);
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 6px;
    background: #e5e2de;
    border-radius: 3px;
    border: 1px solid #c2c8c0;
  }

  .toggle-checkbox {
    position: absolute;
    display: none;
  }

  .toggle-label {
    display: block;
    width: 56px;
    height: 32px;
    background: #dcdad6;
    border-radius: 16px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;
  }

  .toggle-label::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .toggle-checkbox:checked + .toggle-label {
    background-color: #27442f;
  }

  .toggle-checkbox:checked + .toggle-label::after {
    transform: translateX(24px);
  }
`;

function CheckmarkSVG({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="animate-handwritten-check">
      <path d="M5 12L9 16" stroke="#27442f" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="0" />
      <path d="M8.5 16L19 5" stroke="#27442f" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset="0" />
    </svg>
  );
}

export default function CheckInPage() {
  const navigate = useNavigate();
  const [exerciseChecked, setExerciseChecked] = useState(false);
  const [sleepQuality, setSleepQuality] = useState({ restless: false, poor: false, neutral: false, good: false, excellent: false });
  const [mood, setMood] = useState({ sad: false, anxious: false, neutral: false, positive: false, happy: false });
  const [stressLevel, setStressLevel] = useState({ calm: false, tense: false, neutral: false, moderate: false, overwhelmed: false });
  const [winsText, setWinsText] = useState("");

  const selectSingle = (setter, key) => setter(prev =>
    Object.fromEntries(Object.keys(prev).map(k => [k, k === key ? !prev[k] : false]))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/insights');
  };

  const sectionCard = "p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40";
  const checkboxBase = "w-5 h-5 border-2 border-[#27442f] rounded flex items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm";

  return (
    <>
      <style>{styles}</style>
      <div
        className="text-on-surface font-body-md relative overflow-x-clip pb-40 min-h-screen"
        style={{ background: "linear-gradient(160deg, #eef4e8 0%, #fffde8 50%, #f5f5ef 100%)" }}
      >
        <div className="aura-tl" />
        <div className="aura-br" />

        <DashboardHeader />

        <main className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 pt-[60px]">

          {/* Header */}
          <div className="mb-16 mt-12 md:mt-20 text-center drop-shadow-md">
            <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary mb-2">
              Daily Check-in
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Take a moment to reflect on your day.
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm border border-white/60 shadow-sm">
              <span className="material-symbols-outlined text-[16px] mr-2">calendar_today</span>
              October 24, 2023
            </div>
          </div>

          {/* Book frame */}
          <div className="relative w-full max-w-6xl mx-auto z-10">
            <div className="book-page-under-3" />
            <div className="book-page-under-2" />
            <div className="book-page-under-1" />

            {/* Binding line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-black/5 via-black/15 to-black/5 hidden md:block z-20" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative z-10">

              {/* ── Left Page ── */}
              <div
                className="rounded-2xl md:rounded-r-none p-6 md:p-10 min-h-[500px]"
                style={{
                  background: 'rgba(253, 250, 246, 0.75)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.15), 0 10px 20px -10px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div className="space-y-8">

                  {/* Exercise */}
                  <div className={`${sectionCard} flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary">Exercise</h3>
                        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Did you move your body today?</p>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="checkbox" id="exercise-checkbox" className="exercise-checkbox sr-only"
                        checked={exerciseChecked} onChange={(e) => setExerciseChecked(e.target.checked)} />
                      <label htmlFor="exercise-checkbox"
                        className="flex items-center justify-center w-8 h-8 border-2 border-primary rounded-lg cursor-pointer bg-white/50 backdrop-blur-sm">
                        {exerciseChecked && <CheckmarkSVG size={20} />}
                      </label>
                    </div>
                  </div>

                  {/* Sleep Quality */}
                  <div className={sectionCard}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">bedtime</span>
                      <h3 className="font-headline-md text-headline-md text-primary">Sleep Quality</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'restless', label: 'Restless' },
                        { key: 'poor', label: 'Poor' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'good', label: 'Good' },
                        { key: 'excellent', label: 'Excellent' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex flex-col items-center gap-2">
                          <input type="checkbox" id={`sleep-${key}`} className="sleep-checkbox sr-only"
                            checked={sleepQuality[key]}
                            onChange={() => selectSingle(setSleepQuality, key)} />
                          <label htmlFor={`sleep-${key}`} className="flex flex-col items-center gap-1 cursor-pointer select-none p-2 rounded-lg">
                            <div className={checkboxBase}>
                              {sleepQuality[key] && <CheckmarkSVG size={14} />}
                            </div>
                            <span className="text-xs text-on-surface-variant text-center font-medium">{label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mood */}
                  <div className={sectionCard}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">mood</span>
                      <h3 className="font-headline-md text-headline-md text-primary">Mood</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'sad', label: 'Sad' },
                        { key: 'anxious', label: 'Anxious' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'positive', label: 'Positive' },
                        { key: 'happy', label: 'Happy' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex flex-col items-center gap-2">
                          <input type="checkbox" id={`mood-${key}`} className="mood-checkbox sr-only"
                            checked={mood[key]}
                            onChange={() => selectSingle(setMood, key)} />
                          <label htmlFor={`mood-${key}`} className="flex flex-col items-center gap-1 cursor-pointer select-none p-2 rounded-lg">
                            <div className={checkboxBase}>
                              {mood[key] && <CheckmarkSVG size={14} />}
                            </div>
                            <span className="text-xs text-on-surface-variant text-center font-medium">{label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div className={sectionCard}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-primary text-2xl">waves</span>
                      <h3 className="font-headline-md text-headline-md text-primary">Stress Level</h3>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'calm', label: 'Calm' },
                        { key: 'tense', label: 'Tense' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'moderate', label: 'Moderate' },
                        { key: 'overwhelmed', label: 'Overwhelmed' },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex flex-col items-center gap-2">
                          <input type="checkbox" id={`stress-${key}`} className="stress-checkbox sr-only"
                            checked={stressLevel[key]}
                            onChange={() => selectSingle(setStressLevel, key)} />
                          <label htmlFor={`stress-${key}`} className="flex flex-col items-center gap-1 cursor-pointer select-none p-2 rounded-lg">
                            <div className={checkboxBase}>
                              {stressLevel[key] && <CheckmarkSVG size={14} />}
                            </div>
                            <span className="text-xs text-on-surface-variant text-center font-medium">{label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Right Page ── */}
              <div
                className="rounded-2xl md:rounded-l-none p-6 md:p-10 min-h-[500px] flex flex-col"
                style={{
                  background: 'rgba(253, 250, 246, 0.75)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.15), 0 10px 20px -10px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex-grow flex flex-col h-full">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">edit_note</span> Reflection
                    </h3>
                  </div>
                  <div
                    className="glass-input rounded-xl flex-grow h-full p-1 relative shadow-inner"
                    style={{
                      background: 'linear-gradient(180deg, rgba(246,243,239,0.5) 0%, rgba(255,255,255,0.8) 100%)',
                      border: '0.5px solid rgba(114,121,114,0.2)',
                    }}
                  >
                    <textarea
                      className="w-full h-full bg-transparent border-none resize-none p-4 text-on-surface focus:ring-0 placeholder:text-outline-variant/70 handwritten-text"
                      placeholder="Write a short reflection about your day..."
                      value={winsText}
                      onChange={(e) => setWinsText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-primary text-on-primary font-['Manrope'] font-normal text-base leading-6 px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary-fixed-variant transition-all shadow-[0_10px_20px_rgba(39,68,47,0.3)] hover:shadow-[0_15px_30px_rgba(39,68,47,0.4)] hover:-translate-y-1 duration-300"
                  >
                    Submit Entry
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>

        <BottomNav activePage="checkin" onNavigate={navigate} />
      </div>
    </>
  );
}
