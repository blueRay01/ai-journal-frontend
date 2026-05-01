// src/components/layout/Footer.jsx

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20 py-10 relative z-20 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="material-icons text-primary">auto_awesome</span>
          <span className="font-display font-bold text-lg">Aura</span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 Aura Journal. Mindfully crafted.
        </p>

        <div className="flex gap-4 text-gray-400">
          <a href="#" className="hover:text-primary transition-colors">
            <span className="material-icons">share</span>
          </a>
        </div>
      </div>
    </footer>
  );
}