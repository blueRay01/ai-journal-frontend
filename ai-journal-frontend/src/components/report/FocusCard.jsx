// src/components/report/FocusCard.jsx

export default function FocusCard({
  label      = "Intent for Next Week",
  title      = "Mindful Mornings",
  body       = "To stabilize the Thursday energy dips, focus on dedicating the first 15 minutes of your morning to tech-free breathing exercises before checking notifications.",
  onSetFocus,
}) {
  return (
    <section className="paper-card p-8 relative overflow-hidden border border-primary/10">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-primary to-secondary" />

      <h3 className="font-label-caps text-xs tracking-widest uppercase font-bold text-primary mb-3">
        {label}
      </h3>
      <h2 className="text-[32px] font-semibold leading-snug text-on-surface mb-4">{title}</h2>
      <p className="text-[16px] text-outline leading-relaxed mb-6">{body}</p>

      <button
        onClick={onSetFocus}
        className="bg-primary text-on-primary px-6 py-3 rounded-full text-[16px] hover:bg-surface-tint transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300 w-full sm:w-auto"
      >
        Set as Active Focus
      </button>
    </section>
  );
}