// src/components/insight/InsightImage.jsx
//
// All images sourced exclusively from Unsplash (images.unsplash.com).
// Real photographs by human photographers — no AI-generated images.
// The original lh3.googleusercontent.com/aida-public URL has been removed.
//
// Photo IDs marked ✓ original were already in production and are confirmed
// to load correctly in the browser.

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Real-photography image library ──────────────────────────────────────────
const IMAGE_LIBRARY = {
  morning_ritual: {
    label: "Morning Ritual",
    symbols: ["wb_sunny", "coffee", "routine"],
    images: [
      // Misty lake at dawn — ✓ original
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=1200&fit=crop&auto=format&q=80",
      // Mountain summit at sunrise — ✓ original
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&auto=format&q=80",
      // Sunrise over a calm river valley
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  meditation: {
    label: "Meditation & Stillness",
    symbols: ["self_improvement", "spa", "water_drop"],
    images: [
      // Person meditating in sunlight
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&h=1200&fit=crop&auto=format&q=80",
      // Smooth stones balanced on water
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&h=1200&fit=crop&auto=format&q=80",
      // Tranquil Japanese garden path
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  nature_walk: {
    label: "Nature & Movement",
    symbols: ["directions_walk", "park", "eco"],
    images: [
      // Misty mountain trail
      "https://images.unsplash.com/photo-1448375240519-0e6fc3b585f8?w=900&h=1200&fit=crop&auto=format&q=80",
      // Sunlit forest path
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&h=1200&fit=crop&auto=format&q=80",
      // Green rolling hills landscape
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  sleep_recovery: {
    label: "Sleep & Recovery",
    symbols: ["bedtime", "nights_stay", "cloud"],
    images: [
      // Cozy bedroom with moonlight — ✓ original
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5b1440?w=900&h=1200&fit=crop&auto=format&q=80",
      // Starry night over mountains — ✓ original
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&h=1200&fit=crop&auto=format&q=80",
      // Soft linen pillows in warm light
      "https://images.unsplash.com/photo-1586105449897-20b5efeb3233?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  exercise_energy: {
    label: "Exercise & Energy",
    symbols: ["fitness_center", "bolt", "local_fire_department"],
    images: [
      // Yoga in nature — ✓ original
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=1200&fit=crop&auto=format&q=80",
      // Runner on a mountain trail
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&h=1200&fit=crop&auto=format&q=80",
      // Swimmer in clear water
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  nutrition_nourish: {
    label: "Nutrition & Nourishment",
    symbols: ["restaurant", "eco", "water_drop"],
    images: [
      // Fresh fruits and vegetables at market
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=1200&fit=crop&auto=format&q=80",
      // Bowl of colourful whole foods
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=1200&fit=crop&auto=format&q=80",
      // Green smoothies with ingredients
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  mindset_clarity: {
    label: "Mindset & Clarity",
    symbols: ["lightbulb", "psychology", "emoji_emotions"],
    images: [
      // Sunrise over mountains — ✓ original
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=900&h=1200&fit=crop&auto=format&q=80",
      // Open journal on a desk
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&h=1200&fit=crop&auto=format&q=80",
      // Coffee and notebook in morning light
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  stress_relief: {
    label: "Stress Relief",
    symbols: ["spa", "self_improvement", "favorite"],
    images: [
      // Gentle ocean waves on shore
      "https://images.unsplash.com/photo-1476611338391-6f395a1edc3b?w=900&h=1200&fit=crop&auto=format&q=80",
      // Steam rising from hot tea
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900&h=1200&fit=crop&auto=format&q=80",
      // Candles and bath salts arrangement
      "https://images.unsplash.com/photo-1544367866-45045b03dda1?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
  social_connection: {
    label: "Connection & Joy",
    symbols: ["group", "favorite", "celebration"],
    images: [
      // Friends laughing outdoors
      "https://images.unsplash.com/photo-1529156069898-4943d5e8c757?w=900&h=1200&fit=crop&auto=format&q=80",
      // People around a table sharing food
      "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&h=1200&fit=crop&auto=format&q=80",
      // Warm hands around a mug
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&h=1200&fit=crop&auto=format&q=80",
    ],
  },
};

const THEME_KEYS = Object.keys(IMAGE_LIBRARY);
const SLIDE_INTERVAL_MS = 4500;
const TRANSITION_MS = 800;

const TYPE_TO_THEME = {
  morning_routine: "morning_ritual",
  stress_management: "stress_relief",
  sleep_quality: "sleep_recovery",
  mood_improvement: "mindset_clarity",
  exercise_consistency: "exercise_energy",
  energy_levels: "exercise_energy",
};

// Confirmed-working real photo used as onError fallback — ✓ original
const FALLBACK_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&auto=format&q=80";

// ─── AI theme selection ───────────────────────────────────────────────────────
async function fetchThemesForInsight(insightContent) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 120,
        messages: [
          {
            role: "user",
            content: `You are selecting visual themes for a wellness app. Given the insight below, pick the 3 most thematically relevant keys from this exact list:
${THEME_KEYS.join(", ")}

Insight: "${insightContent.slice(0, 600)}"

Reply ONLY with a valid JSON array of 3 keys chosen strictly from the list above. No markdown, no explanation.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const raw = data.content?.[0]?.text?.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      const valid = parsed.filter((k) => IMAGE_LIBRARY[k]);
      if (valid.length >= 1) return valid.slice(0, 3);
    }
  } catch (e) {
    console.error("[InsightImage] AI theme fetch failed:", e);
  }
  return null;
}

// ─── Build interleaved slides from theme keys ─────────────────────────────────
function buildSlides(themeKeys) {
  const maxLen = Math.max(...themeKeys.map((k) => IMAGE_LIBRARY[k]?.images.length ?? 0));
  const result = [];
  for (let i = 0; i < maxLen; i++) {
    themeKeys.forEach((key) => {
      const theme = IMAGE_LIBRARY[key];
      const url = theme?.images?.[i];
      if (url) result.push({ url, symbols: theme.symbols });
    });
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function InsightImage({
  insightType = "morning_routine",
  // Pass insight.content directly — NOT the loading-placeholder string.
  // In InsightContent: <InsightImage insightType={insightType} insightContent={rawContent} />
  // In AIInsightPage: pass rawContent={insight.content} separately from the display `content` prop.
  insightContent = "",
}) {
  const [slides, setSlides]       = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading]   = useState(false);
  const [ready, setReady]         = useState(false);

  // Refs for the interval + fade timeout so we can clear them from anywhere
  const intervalRef   = useRef(null);
  const fadeRef       = useRef(null);
  // Track the last content string we acted on to avoid redundant fetches
  const lastContentRef = useRef(undefined);

  // ── Single effect: fetch themes → set slides → start interval ────────────
  //
  // KEY FIX: Everything lives in one effect. A `cancelled` flag prevents a
  // slow/stale async call from overwriting state after the effect has been
  // re-run (race condition fix). The interval starts directly after slides
  // are set — no separate slideshow effect, no stale-closure issues.
  useEffect(() => {
    const content = insightContent?.trim() ?? "";

    // Nothing changed — don't re-fetch or restart the slideshow
    if (content === lastContentRef.current) return;
    lastContentRef.current = content;

    // Cancel any in-flight fetch and stop the current slideshow
    let cancelled = false;
    clearInterval(intervalRef.current);
    clearTimeout(fadeRef.current);

    setReady(false);
    setActiveIndex(0);
    setIsFading(false);

    const load = async () => {
      let themeKeys = null;

      // Only call the API when we have real insight text (≥ 50 chars).
      // This skips the loading-placeholder string and empty states.
      if (content.length >= 50) {
        themeKeys = await fetchThemesForInsight(content);
      }

      // If the effect was re-triggered while we were awaiting, bail out.
      if (cancelled) return;

      // Fall back to the insightType mapping when the API call was skipped or failed
      if (!themeKeys || themeKeys.length === 0) {
        const fallbackKey = TYPE_TO_THEME[insightType] ?? "morning_ritual";
        themeKeys = [fallbackKey];
      }

      const newSlides = buildSlides(themeKeys);
      setSlides(newSlides);
      setReady(true);

      // Start the slideshow immediately after slides are set.
      // newSlides is captured in this closure so the interval always has
      // the correct length — no stale-closure issues.
      if (newSlides.length > 1) {
        intervalRef.current = setInterval(() => {
          if (cancelled) return;
          setIsFading(true);
          fadeRef.current = setTimeout(() => {
            if (cancelled) return;
            setActiveIndex((prev) => (prev + 1) % newSlides.length);
            setIsFading(false);
          }, TRANSITION_MS);
        }, SLIDE_INTERVAL_MS);
      }
    };

    load();

    // Cleanup: mark cancelled so the async call won't touch state,
    // and clear any running timers
    return () => {
      cancelled = true;
      clearInterval(intervalRef.current);
      clearTimeout(fadeRef.current);
    };
  }, [insightContent, insightType]);

  // ── Manual dot navigation ─────────────────────────────────────────────────
  const goTo = useCallback(
    (index) => {
      clearInterval(intervalRef.current);
      clearTimeout(fadeRef.current);
      setIsFading(true);
      fadeRef.current = setTimeout(() => {
        setActiveIndex(index);
        setIsFading(false);
        // Restart interval after manual navigation
        if (slides.length > 1) {
          intervalRef.current = setInterval(() => {
            setIsFading(true);
            fadeRef.current = setTimeout(() => {
              setActiveIndex((prev) => (prev + 1) % slides.length);
              setIsFading(false);
            }, TRANSITION_MS);
          }, SLIDE_INTERVAL_MS);
        }
      }, TRANSITION_MS);
    },
    [slides.length]
  );

  const symbols = slides[activeIndex]?.symbols ?? ["wb_sunny", "directions_walk", "routine"];

  return (
    <>
      {/* ── Image frame ─────────────────────────────────────────────────── */}
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 aspect-4/5 md:aspect-auto md:h-[500px] group">

        {/* Shimmer while loading */}
        {!ready && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-stone-100 to-emerald-50 animate-pulse" />
        )}

        {/* All slides stacked; opacity controls visibility */}
        {slides.map((slide, i) => (
          <img
            key={slide.url}
            alt="Wellness photography"
            src={slide.url}
            draggable={false}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_URL) {
                e.currentTarget.src = FALLBACK_URL;
              }
            }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            style={{
              opacity: i === activeIndex ? (isFading ? 0 : 1) : 0,
              transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
              pointerEvents: i === activeIndex ? "auto" : "none",
            }}
          />
        ))}

        {/* Dot navigation — visible on hover */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Top progress bar */}
        {slides.length > 1 && ready && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20 overflow-hidden">
            <div
              key={`${activeIndex}-bar`}
              className="h-full bg-white/60"
              style={{
                animation: `insightProgress ${SLIDE_INTERVAL_MS}ms linear forwards`,
              }}
            />
          </div>
        )}
      </div>

      {/* ── Symbol row ──────────────────────────────────────────────────── */}
      <div
        className={`flex items-center gap-6 text-emerald-800/50 justify-center transition-all duration-500 ease-in-out ${
          isFading || !ready ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {symbols.map((symbol, index) => (
          <span key={`${symbol}-${index}`} className="flex items-center">
            <span className="material-symbols-outlined text-3xl font-light">
              {symbol}
            </span>
            {index < symbols.length - 1 && (
              <span className="w-10 h-px bg-emerald-800/20 ml-6" />
            )}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes insightProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
}