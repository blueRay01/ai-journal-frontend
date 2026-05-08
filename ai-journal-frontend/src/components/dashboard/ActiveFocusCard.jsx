export default function ActiveFocusCard({ title = null, subtitle = null }) {
  return (
    <div className="md:col-span-9 bg-[#2f4a35] rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden min-h-[140px]">
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        {[40, 30, 20, 10].map((r) => (
          <circle key={r} cx="80" cy="50" r={r} fill="none" stroke="white" strokeWidth="1.5" />
        ))}
      </svg>
      <span className="inline-flex w-fit items-center gap-1 bg-[#4a6a50] text-[#b8d4bc] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
        <span className="material-symbols-outlined text-[12px]">bolt</span>
        Active Focus
      </span>
      <div>
        {title ? (
          <>
            <h3 className="text-white text-xl font-light leading-tight">{title}</h3>
            {subtitle && (
              <p className="text-[#9ab89e] text-sm mt-1">{subtitle}</p>
            )}
          </>
        ) : (
          <>
            <h3 className="text-white text-xl font-light leading-tight opacity-40">No active task</h3>
            <p className="text-[#9ab89e] text-sm mt-1 opacity-40">
              Your current timeline task will appear here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}