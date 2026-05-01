// src/components/layout/Navbar.jsx

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
      <div className="bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3 rounded-full shadow-paper dark:shadow-paper-dark border border-gray-100 dark:border-gray-800 flex items-center space-x-8">
        <a href="#" className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
          <span className="material-icons text-primary">auto_awesome</span>
          Aura
        </a>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-primary transition-colors">Philosophy</a>
          <a href="#" className="hover:text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
        </div>

        <a
          href="#"
          className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
}