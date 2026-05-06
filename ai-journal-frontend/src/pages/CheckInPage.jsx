// src/pages/CheckInPage.jsx
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/layout/BottomNav";
import { useState } from "react";
import DashboardHeader from "../components/layout/DashboardHeader";

// Add styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

  .handwritten-text {
    font-family: 'Caveat', cursive;
    font-size: 18px;
    line-height: 1.6;
  }

  @keyframes handwritten-check {
    0% {
      stroke-dasharray: 0 100;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      stroke-dasharray: 100 0;
      opacity: 1;
    }
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
    background-color: rgba(39, 68, 47, 0.1);
    border-color: #27442f;
  }

  .aura-tl {
    position: fixed;
    top: -10%;
    left: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(173,207,178,0.3) 0%, rgba(250,243,225,0) 70%);
    border-radius: 50%;
    filter: blur(60px);
    z-index: -1;
    pointer-events: none;
  }

  .aura-br {
    position: fixed;
    bottom: -10%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(204,190,250,0.2) 0%, rgba(250,243,225,0) 70%);
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
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

  body {
    background-color: #FAF3E1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
    min-height: 100vh;
  }
`;

export default function CheckInPage() {
    const navigate = useNavigate();
    const [exerciseChecked, setExerciseChecked] = useState(false);
    const [sleepQuality, setSleepQuality] = useState({
        restless: false,
        poor: false,
        neutral: false,
        good: false,
        excellent: false
    });
    const [mood, setMood] = useState({
        sad: false,
        anxious: false,
        neutral: false,
        positive: false,
        happy: false
    });
    const [stressLevel, setStressLevel] = useState({
        calm: false,
        tense: false,
        neutral: false,
        moderate: false,
        high: false
    });
    const [winsText, setWinsText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Check-in submitted:', {
            exerciseChecked,
            sleepQuality,
            mood,
            stressLevel,
            winsText
        });
        // Navigate to insights after submission
        navigate('/insights');
    };

  return (
    <>
      
      <style>{styles}</style>
      <div className="text-on-surface font-body-md relative overflow-x-clip pb-40">

      {/* Atmospheric Auras */}
      <div className="aura-tl"></div>
      <div className="aura-br"></div>
      <DashboardHeader />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 mt-4 md:mt-12">

        {/* Header */}
        <div className="mb-16 text-center drop-shadow-md">
          <h1 className="font-display text-[48px] font-light leading-tight tracking-tight text-primary mb-2">Daily Check-in</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Take a moment to reflect on your day.</p>
          <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-fixed/50 text-on-secondary-container font-label-sm text-label-sm border border-secondary-fixed-dim/30 shadow-sm">
            <span className="material-symbols-outlined text-[16px] mr-2">calendar_today</span>
            October 24, 2023
          </div>
        </div>

        {/* Open Journal Book Frame */}
        <div className="relative w-full max-w-6xl mx-auto z-10">
          {/* Book Pages Underneath */}
          <div className="book-page-under-3"></div>
          <div className="book-page-under-2"></div>
          <div className="book-page-under-1"></div>
          {/* Book binding aesthetic line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-outline-variant/10 via-outline-variant/40 to-outline-variant/10 hidden md:block z-20 shadow-inner"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative z-10">

            {/* Left Page */}
            <div className="rounded-2xl md:rounded-r-none p-6 md:p-10 min-h-[500px]" style={{ 
              background: 'rgba(253, 250, 246, 0.75)', 
              border: '1px solid rgba(255, 255, 255, 0.9)', 
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}>
              <div className="space-y-8">
                {/* Exercise Section */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary">Exercise</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Did you move your body today?</p>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="checkbox"
                      id="exercise-checkbox"
                      className="exercise-checkbox sr-only"
                      checked={exerciseChecked}
                      onChange={(e) => setExerciseChecked(e.target.checked)}
                    />
                    <label
                      htmlFor="exercise-checkbox"
                      className="flex items-center justify-center w-8 h-8 border-2 border-primary rounded-lg cursor-pointer transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                    >
                      {exerciseChecked && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-primary animate-handwritten-check"
                        >
                          {/* First stroke of the checkmark */}
                          <path
                            d="M5 12L9 16"
                            stroke="#27442f"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="100"
                            strokeDashoffset="0"
                          />
                          {/* Second stroke of the checkmark - overlapping */}
                          <path
                            d="M8.5 16L19 5"
                            stroke="#27442f"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="100"
                            strokeDashoffset="0"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                </div>

                {/* Sleep Quality */}
                <div className="p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-outline-variant/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary text-2xl">bedtime</span>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary">Sleep Quality</h3>
                        <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface px-2 py-1 rounded shadow-sm">REST</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'restless', label: 'Restless' },
                        { key: 'poor', label: 'Poor' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'good', label: 'Good' },
                        { key: 'excellent', label: 'Excellent' }
                      ].map((option) => (
                        <div key={option.key} className="flex flex-col items-center gap-2">
                          <input 
                            type="checkbox"
                            id={`sleep-${option.key}`}
                            className="sleep-checkbox sr-only"
                            checked={sleepQuality[option.key]}
                            onChange={(e) => setSleepQuality(prev => ({
                              ...prev,
                              [option.key]: e.target.checked
                            }))}
                          />
                          <label
                            htmlFor={`sleep-${option.key}`}
                            className="flex flex-col items-center gap-1 cursor-pointer select-none transition-all duration-300 hover:opacity-80 p-2 rounded-lg border-2 border-transparent hover:border-primary/30"
                          >
                            <div className="w-5 h-5 border-2 border-primary rounded flex items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm">
                              {sleepQuality[option.key] && (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-primary animate-handwritten-check"
                                >
                                  {/* First stroke of the checkmark */}
                                  <path
                                    d="M5 12L9 16"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                  {/* Second stroke of the checkmark - overlapping */}
                                  <path
                                    d="M8.5 16L19 5"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant text-center">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mood */}
                <div className="p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-outline-variant/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary text-2xl">mood</span>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary">Mood</h3>
                        <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface px-2 py-1 rounded shadow-sm">FEELING</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'sad', label: 'Sad' },
                        { key: 'anxious', label: 'Anxious' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'positive', label: 'Positive' },
                        { key: 'happy', label: 'Happy' }
                      ].map((option) => (
                        <div key={option.key} className="flex flex-col items-center gap-2">
                          <input 
                            type="checkbox"
                            id={`mood-${option.key}`}
                            className="mood-checkbox sr-only"
                            checked={mood[option.key]}
                            onChange={(e) => setMood(prev => ({
                              ...prev,
                              [option.key]: e.target.checked
                            }))}
                          />
                          <label
                            htmlFor={`mood-${option.key}`}
                            className="flex flex-col items-center gap-1 cursor-pointer select-none transition-all duration-300 hover:opacity-80 p-2 rounded-lg border-2 border-transparent hover:border-primary/30"
                          >
                            <div className="w-5 h-5 border-2 border-primary rounded flex items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm">
                              {mood[option.key] && (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-primary animate-handwritten-check"
                                >
                                  {/* First stroke of the checkmark */}
                                  <path
                                    d="M5 12L9 16"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                  {/* Second stroke of the checkmark - overlapping */}
                                  <path
                                    d="M8.5 16L19 5"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant text-center">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stress Level */}
                <div className="p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-outline-variant/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-symbols-outlined text-primary text-2xl">waves</span>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary">Stress Level</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        { key: 'calm', label: 'Calm' },
                        { key: 'tense', label: 'Tense' },
                        { key: 'neutral', label: 'Neutral' },
                        { key: 'moderate', label: 'Moderate' },
                        { key: 'overwhelmed', label: 'Overwhelmed' }
                      ].map((option) => (
                        <div key={option.key} className="flex flex-col items-center gap-2">
                          <input 
                            type="checkbox"
                            id={`stress-${option.key}`}
                            className="stress-checkbox sr-only"
                            checked={stressLevel[option.key]}
                            onChange={(e) => setStressLevel(prev => ({
                              ...prev,
                              [option.key]: e.target.checked
                            }))}
                          />
                          <label
                            htmlFor={`stress-${option.key}`}
                            className="flex flex-col items-center gap-1 cursor-pointer select-none transition-all duration-300 hover:opacity-80 p-2 rounded-lg border-2 border-transparent hover:border-primary/30"
                          >
                            <div className="w-5 h-5 border-2 border-primary rounded flex items-center justify-center transition-all duration-300 bg-white/50 backdrop-blur-sm">
                              {stressLevel[option.key] && (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="text-primary animate-handwritten-check"
                                >
                                  {/* First stroke of the checkmark */}
                                  <path
                                    d="M5 12L9 16"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                  {/* Second stroke of the checkmark - overlapping */}
                                  <path
                                    d="M8.5 16L19 5"
                                    stroke="#27442f"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant text-center">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Page */}
            <div className="rounded-2xl md:rounded-l-none p-6 md:p-10 min-h-[500px] flex flex-col" style={{ 
              background: 'rgba(253, 250, 246, 0.75)', 
              border: '1px solid rgba(255, 255, 255, 0.9)', 
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}>
              <div className="flex-grow flex flex-col h-full">
                {/* Text Area */}
                <div className="flex-grow flex flex-col h-full">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">edit_note</span> Wins
                    </h3>
                  </div>
                  <div className="glass-input rounded-xl flex-grow h-full p-1 relative shadow-inner" style={{ background: 'linear-gradient(180deg, rgba(246, 243, 239, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%)', border: '0.5px solid rgba(114, 121, 114, 0.2)' }}>
                    <textarea 
                      className="w-full h-full bg-transparent border-none resize-none p-4 text-on-surface focus:ring-0 placeholder:text-outline-variant/70 handwritten-text" 
                      placeholder="Any wins today? Big or small, write them down..."
                      value={winsText}
                      onChange={(e) => setWinsText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  className="bg-primary text-on-primary font-['Manrope'] font-normal text-base leading-6 tracking-normal px-8 py-4 rounded-full flex items-center gap-2 hover:bg-primary-fixed-variant transition-colors shadow-[0_10px_20px_rgba(39,68,47,0.3)] hover:shadow-[0_15px_30px_rgba(39,68,47,0.4)] hover:-translate-y-1 duration-300"
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