// src/components/report/CorrelationCard.jsx

export default function CorrelationCard({
  title = "Crucial Correlation Discovered",
  body,
}) {
  const defaultBody = (
    <>
      Your journal entries indicate a strong link between{" "}
      <strong className="text-on-surface">7+ hours of sleep</strong> and a{" "}
      <strong className="text-on-surface">40% reduction in reported anxiety</strong> the
      following day. When exercise is added on well-rested days, your mood score peaks.
    </>
  );

  return (
    <section className="paper-card bg-tertiary-container/10 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l-4 border-l-tertiary-container">
      <div className="p-4 bg-tertiary-container/20 text-tertiary-container rounded-full shrink-0">
        <span
          className="material-symbols-outlined text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          insights
        </span>
      </div>

      <div>
        <h3 className="text-[24px] font-semibold text-on-surface mb-2">{title}</h3>
        <p className="text-[18px] text-outline leading-relaxed">
          {body ?? defaultBody}
        </p>
      </div>
    </section>
  );
}