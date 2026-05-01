// src/components/sections/FeaturesSection.jsx

const MOODS = ["😫", "😕", "😐", "🙂", "🤩"];

const METRICS = [
  { icon: "trending_up", label: "Mood",   width: "70%", color: "bg-secondary" },
  { icon: "bolt",        label: "Energy", width: "45%", color: "bg-primary"   },
];

function CheckInCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-paper dark:shadow-paper-dark border border-gray-100 dark:border-gray-800 lg:col-span-2 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <span className="material-icons text-9xl text-primary">edit_note</span>
      </div>

      <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
        Daily Check-ins
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        A frictionless interface to capture your mood, energy, and thoughts in seconds. Simple
        enough for everyday use.
      </p>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transform rotate-1 hover:rotate-0 transition-transform">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">How are you feeling today?</span>
          <span className="text-xs text-gray-400">Oct 24</span>
        </div>

        <div className="flex gap-4 mb-6">
          {MOODS.map((emoji, i) => (
            <button
              key={i}
              className={`w-12 h-12 rounded-full shadow flex items-center justify-center text-xl transition-colors border ${
                i === 2
                  ? "bg-primary text-white shadow-lg shadow-primary/30 border-primary"
                  : "bg-white dark:bg-gray-800 hover:bg-primary/10 border-gray-100 dark:border-gray-700"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="h-24 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-3">
          <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-700 rounded mb-2" />
          <div className="w-1/2 h-2 bg-gray-100 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

function AIAnalysisCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-paper dark:shadow-paper-dark border border-gray-100 dark:border-gray-800 flex flex-col relative overflow-hidden">
      <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
        AI Analysis
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
        Discover hidden connections between your activities and your mood.
      </p>

      <div className="bg-secondary/10 dark:bg-secondary/5 rounded-xl p-5 border border-secondary/20 relative mt-auto">
        <div className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="material-icons text-secondary text-sm">insights</span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium mb-2">
          Insight Detected
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          You consistently report higher energy on days following a "reading" session.
        </p>
      </div>
    </div>
  );
}

function NudgesCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-paper dark:shadow-paper-dark border border-gray-100 dark:border-gray-800 flex flex-col justify-center items-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="material-icons text-primary text-3xl">notifications_active</span>
      </div>
      <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
        Personalized Nudges
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Gentle reminders to check in, based on your historical patterns and goals.
      </p>
    </div>
  );
}

function WeeklySummaryCard() {
  return (
    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-2xl shadow-paper dark:shadow-paper-dark border border-gray-100 dark:border-gray-800 lg:col-span-2 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
            Weekly Summary
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A beautifully crafted recap of your week, highlighting wins, identifying stressors, and
            offering mindful suggestions for the days ahead.
          </p>
          <a href="#" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View a sample summary
            <span className="material-icons text-sm">arrow_forward</span>
          </a>
        </div>

        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700 transform -rotate-2 hover:rotate-0 transition-transform shadow-sm">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
            <h4 className="font-display font-bold text-lg text-gray-800 dark:text-gray-200">
              Your Week in Review
            </h4>
            <p className="text-xs text-gray-500">Oct 18 - Oct 24</p>
          </div>

          <div className="space-y-3">
            {METRICS.map(({ icon, label, width, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="material-icons text-sm">{icon}</span>
                </div>
                <div className="flex-1">
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width }} />
                  </div>
                </div>
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-20 relative z-20">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Clarity in Complexity
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We help you decode the noise. One insight at a time. Transform chaos into clarity with
          intelligent solutions built for scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CheckInCard />
        <AIAnalysisCard />
        <NudgesCard />
        <WeeklySummaryCard />
      </div>
    </section>
  );
}