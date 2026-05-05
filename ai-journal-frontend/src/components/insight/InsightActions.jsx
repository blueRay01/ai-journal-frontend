// src/components/insight/InsightActions.jsx
import { useNavigate } from "react-router-dom";

export default function InsightActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-primary/10">
      <button 
        onClick={() => navigate('/dashboard')}
        className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary rounded-full font-label-sm text-label-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
      >
        <span className="material-symbols-outlined text-[20px]">dashboard</span>
        Back to Dashboard
      </button>
    </div>
  );
}