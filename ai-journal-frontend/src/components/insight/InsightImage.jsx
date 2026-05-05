// src/components/insight/InsightImage.jsx

export default function InsightImage() {
  return (
    <>
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/20 aspect-[4/5] md:aspect-auto md:h-[500px]">
        <img 
          alt="A misty morning forest" 
          className="w-full h-full object-cover"
          data-alt="A serene, minimalist photograph of a misty pine forest at early morning dawn. Soft, diffused, light-mode lighting filters through the fog, creating a tranquil, high-end aesthetic. The color palette emphasizes soft sage greens, faded earthy tones, and pure white mist, perfectly matching a sophisticated digital sanctuary style. The mood is meditative, quiet, and deeply calming."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmD20Y8MzqYCLCPw5Hq5lKuAKgdswDAUkS5XTC1AhTqfpcyHFj_A1-CMRW0ILuI4OlVtwabwLsozjwlDkSBtvzcXLQnRPw2nLgl8yXG6V5Cu52Aunnfi_wHMxK6aRo5AMpwjuaq52YsFLDGiGzxO9TcIEf2O-IWllFUuAFRbkJiM64TnRxWbLR0kMvIwpq5hVhxfhJZxlmH2Bz0UG8c1be9iygYzQuwr_yzD2_cR5Vn2BHJ_IZntQb8i8CLLmlS1H2I48qvHvoGfY"
        />
      </div>
      
      <div className="flex items-center gap-6 text-emerald-800/50 justify-center">
        <span className="material-symbols-outlined text-3xl font-light">routine</span>
        <span className="w-16 h-px bg-emerald-800/20"></span>
        <span className="material-symbols-outlined text-3xl font-light">directions_walk</span>
        <span className="w-16 h-px bg-emerald-800/20"></span>
        <span className="material-symbols-outlined text-3xl font-light">wb_sunny</span>
      </div>
    </>
  );
}