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
      <p className="font-normal text-[16px] text-outline leading-relaxed mb-6">{body}</p>

     
    </section>
  );
}