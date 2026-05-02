// src/components/report/PeakResonanceCard.jsx

export default function PeakResonanceCard({ day = "Tuesday", description = "Deep focus and high energy reported post-meditation." }) {
  return (
    <section className="paper-card p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-fixed/30 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />

      <div className="flex items-center gap-2 mb-4 text-secondary">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          wb_sunny
        </span>
        <span className="font-label-caps text-xs tracking-widest uppercase font-bold">
          Peak Resonance
        </span>
      </div>

      <h3 className="text-[32px] font-semibold leading-snug text-on-surface mb-2">{day}</h3>
      <p className="text-[16px] text-outline leading-relaxed">{description}</p>
    </section>
  );
}