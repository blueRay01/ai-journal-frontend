// src/components/insight/InsightImage.jsx
import { useState, useEffect } from "react";

// Insight type configurations with corresponding images and symbols
const INSIGHT_TYPES = {
  morning_routine: {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmD20Y8MzqYCLCPw5Hq5lKuAKgdswDAUkS5XTC1AhTqfpcyHFj_A1-CMRW0ILuI4OlVtwabwLsozjwlDkSBtvzcXLQnRPw2nLgl8yXG6V5Cu52Aunnfi_wHMxK6aRo5AMpwjuaq52YsFLDGiGzxO9TcIEf2O-IWllFUuAFRbkJiM64TnRxWbLR0kMvIwpq5hVhxfhJZxlmH2Bz0UG8c1be9iygYzQuwr_yzD2_cR5Vn2BHJ_IZntQb8i8CLLmlS1H2I48qvHvoGfY",
    alt: "A serene, minimalist photograph of a misty pine forest at early morning dawn. Soft, diffused, light-mode lighting filters through the fog, creating a tranquil, high-end aesthetic. The color palette emphasizes soft sage greens, faded earthy tones, and pure white mist, perfectly matching a sophisticated digital sanctuary style. The mood is meditative, quiet, and deeply calming.",
    symbols: ["routine", "directions_walk", "wb_sunny"]
  },
  stress_management: {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
    alt: "A peaceful lake with calm waters reflecting mountains at sunset. The serene atmosphere promotes relaxation and stress relief.",
    symbols: ["self_improvement", "water_drop", "spa"]
  },
  sleep_quality: {
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5b1440?w=800&h=1200&fit=crop",
    alt: "A cozy bedroom with soft moonlight streaming through windows, creating a peaceful sleeping environment.",
    symbols: ["bedtime", "nights_stay", "cloud"]
  },
  mood_improvement: {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
    alt: "A vibrant sunrise over mountains symbolizing hope and positive mood changes.",
    symbols: ["mood", "light_mode", "emoji_emotions"]
  },
  exercise_consistency: {
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1200&fit=crop",
    alt: "A person doing yoga in nature, showing the connection between exercise and mental wellbeing.",
    symbols: ["fitness_center", "hiking", "sports_basketball"]
  },
  energy_levels: {
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=1200&fit=crop",
    alt: "A flowing river representing energy and vitality in daily life.",
    symbols: ["bolt", "battery_charging_full", "local_fire_department"]
  }
};

export default function InsightImage({ insightType = "morning_routine" }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentImage, setCurrentImage] = useState(insightType);
  const [currentSymbols, setCurrentSymbols] = useState(INSIGHT_TYPES[insightType]?.symbols || []);
  const [currentAlt, setCurrentAlt] = useState(INSIGHT_TYPES[insightType]?.alt || "");

  const insightConfig = INSIGHT_TYPES[insightType] || INSIGHT_TYPES.morning_routine;

  useEffect(() => {
    if (insightType !== currentImage) {
      // Start fade out
      setIsTransitioning(true);
      
      // After fade out, change content and fade in
      setTimeout(() => {
        setCurrentImage(insightType);
        setCurrentSymbols(insightConfig.symbols);
        setCurrentAlt(insightConfig.alt);
        setIsTransitioning(false);
      }, 500); // Half of transition duration for fade out
    }
  }, [insightType, currentImage, insightConfig]);

  return (
    <>
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 aspect-[4/5] md:aspect-auto md:h-[500px]">
        <img 
          alt={currentAlt}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          src={INSIGHT_TYPES[currentImage]?.image || INSIGHT_TYPES.morning_routine.image}
          onError={(e) => {
            // Fallback to a working image if current one fails
            e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop";
          }}
          onLoad={() => {
            // Ensure image is visible when loaded
            setIsTransitioning(false);
          }}
        />
      </div>
      
      <div className={`flex items-center gap-6 text-emerald-800/50 justify-center transition-all duration-500 ease-in-out ${
        isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
      }`}>
        {currentSymbols.map((symbol, index) => (
          <span key={`${symbol}-${index}`} className="transition-all duration-500 ease-in-out">
            <span className="material-symbols-outlined text-3xl font-light transition-all duration-500 ease-in-out">{symbol}</span>
            {index < currentSymbols.length - 1 && (
              <span className="w-16 h-px bg-emerald-800/20 mx-6 transition-all duration-500 ease-in-out"></span>
            )}
          </span>
        ))}
      </div>
    </>
  );
}