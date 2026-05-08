// src/components/report/FocusCard.jsx
import { useState, useEffect } from "react";

export default function FocusCard({ entries = [] }) {
  const [intent, setIntent] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntent = async () => {
      if (entries.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/generate-weekly-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ entries }),
        });

        // Guard: non-2xx responses may return HTML, not JSON
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server error ${response.status}: ${text.slice(0, 200)}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Guard: ensure the expected shape is present
        if (!data.intent?.title || !data.intent?.body) {
          throw new Error("Unexpected response shape from server.");
        }

        setIntent(data.intent);
      } catch (err) {
        console.error("Error fetching weekly intent:", err);
        setError(err.message);
        // Fallback to default content
        setIntent({
          title: "Mindful Mornings",
          body: "To stabilize the Thursday energy dips, focus on dedicating the first 15 minutes of your morning to tech-free breathing exercises before checking notifications.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchIntent();
  }, [entries]);

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
        {intent.title || "Loading..."}
      </h2>
      <p className="font-normal text-[16px] text-outline leading-relaxed mb-6">
        {intent.body || "Loading..."}
      </p>
    </section>
  );
}
