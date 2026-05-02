// src/components/layout/BottomNav.jsx

const NAV_ITEMS = [
  { icon: "home",        label: "Home",     href: "#", active: true  },
  { icon: "add_circle",  label: "Check-in", href: "#", active: false },
  { icon: "history",     label: "History",  href: "#", active: false },
  { icon: "analytics",   label: "Report",   href: "#", active: false },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center px-3 py-2 bg-surface-container-lowest/90 backdrop-blur-xl rounded-full gap-1 md:gap-2 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.4)] border border-white/80 w-auto">
      {NAV_ITEMS.map(({ icon, label, href, active }) =>
        active ? (
          <a
            key={label}
            href={href}
            className="flex items-center justify-center bg-primary text-on-primary rounded-full px-5 py-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <span
              className="material-symbols-outlined md:mr-2 text-[20px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              {icon}
            </span>
            <span className="font-label-sm font-semibold hidden md:block">{label}</span>
          </a>
        ) : (
          <a
            key={label}
            href={href}
            className="flex items-center justify-center text-on-surface-variant/70 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-all duration-300"
          >
            <span className="material-symbols-outlined md:mr-2 text-[20px]">{icon}</span>
            <span className="font-label-sm font-semibold hidden md:block">{label}</span>
          </a>
        )
      )}
    </nav>
  );
}