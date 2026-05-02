// src/components/report/HighFrictionCard.jsx

export default function HighFrictionCard({ day = "Thursday", description = "Elevated stress levels linked to disrupted sleep schedule." }) {
  return (
    <section className="paper-card p-8 relative overflow-hidden group">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-surface-variant/50 rounded-tl-full -z-10 group-hover:scale-110 transition-transform duration-700" />

      <div className="flex items-center gap-2 mb-4 text-outline">
        <span className="material-symbols-outlined">cloud</span>
        <span className="font-label-caps text-xs tracking-widest uppercase font-bold">
          High Friction
        </span>
      </div>

      <h3 className="text-[32px] font-semibold leading-snug text-on-surface mb-2">{day}</h3>
      <p className="text-[16px] text-outline leading-relaxed">{description}</p>
    </section>
  );
}