// src/components/report/FocusCard.jsx
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

export default function FocusCard({ entries = [] }) {
  const { user } = useAuth();
  const [intent, setIntent] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || entries.length === 0) {
      setLoading(false);
      return;
    }

    const fetchIntent = async () => {
      const weekKey = getWeekKey();
      const intentRef = doc(db, "users", user.uid, "weeklyIntents", weekKey);

      // Check Firestore cache first
      try {
        const cached = await getDoc(intentRef);
        if (cached.exists()) {
          setIntent(cached.data());
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to read cached intent:", err);
      }

      // Not cached — fetch from API and save
      try {
        const response = await fetch("http://localhost:5000/api/generate-weekly-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server error ${response.status}: ${text.slice(0, 200)}`);
        }

        const data = await response.json();
        if (data.error) throw new Error(data.error);
        if (!data.intent?.title || !data.intent?.body) {
          throw new Error("Unexpected response shape from server.");
        }

        setIntent(data.intent);

        // Persist to Firestore under users/{uid}/weeklyIntents/{weekKey}
        await setDoc(intentRef, {
          title: data.intent.title,
          body: data.intent.body,
          generatedAt: new Date().toISOString(),
          weekKey,
        });
      } catch (err) {
        console.error("Error fetching weekly intent:", err);
        setError(err.message);
        setIntent({
          title: "Mindful Mornings",
          body: "To stabilize the Thursday energy dips, focus on dedicating the first 15 minutes of your morning to tech-free breathing exercises before checking notifications.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIntent();
  }, [user, entries]);

  if (loading) {
    return (
      <section className="paper-card p-8 relative overflow-hidden border border-primary/10">
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-2 border-c8c8c0 border-t-5a7a5a rounded-full animate-spin" />
          <span className="ml-3 text-outline">Generating insights...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="paper-card p-8 relative overflow-hidden border border-primary/10">
        <div className="text-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-3">error</span>
          <p className="text-outline">Unable to load weekly intent. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="paper-card p-8 relative overflow-hidden border border-primary/10">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-primary to-secondary" />
      <h3 className="font-label-caps text-xs tracking-widest uppercase font-bold text-primary mb-3">
        Intent for Next Week
      </h3>
      <h2 className="text-[32px] font-semibold leading-snug text-on-surface mb-4">
        {intent.title}
      </h2>
      <p className="font-normal text-[16px] text-outline leading-relaxed mb-6">
        {intent.body}
      </p>
    </section>
  );
}