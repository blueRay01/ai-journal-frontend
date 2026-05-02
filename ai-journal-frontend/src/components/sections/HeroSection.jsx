// src/components/sections/HeroSection.jsx

const TRUSTED_USERS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCb2BxbJ8wURbPLP5l-UmjvJZsvR1mxY0zgPYZFHP0aic1ooImKpGQXcLBXgOEeqyiM6x5nyndg53yKpS1atOkG-iHRlckYlf57Jn-BHgcDl4IECSKb8srNxYNFf9nEXjmEWklncSGhGBNzALsGhSfW0aQw9YP4vJwm55QUdwkp8qVbpZoMgO2gLlTrJbeLyvHFGA7jGr4c7gCD_E2IO1knoOtDk_JuMTNF7bcSgpsp9qOWeZSFy-8pAfiQqpxYHIh0qw6po91PBvA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB1rOv_sW_QFsNoNCaBREHV-uUIXe_sQWMx98EPY1gwG9pr4cTLAeRPcs5Rs1fGEmrt-M9Ndy_iArG_d-6-v49eu6h7E4SNiIrb3W7IP07B0yzWaPU6huXT3rb3EBplrgOJKyt8jWoFgJ-LPqXsF2zVRBCYSrQqLMpWleKy0dpmJKybx6C9S-Tjnxf3KQza211a6RgkT11gqx3e_Ygy_tvYuUsvxrfhkf7SUNzoVjFOzl6X3f7ktuQquf8WM5DVguflQzYnFWFOtkU",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAyb-LTsNmQoNXejBooCGvyCiVjX5Yt_fNT02GgkoZMud_weErgfDEThQq-nPOWekgOuUDSx7bm5VL7CIX2127fNyPcdn-luTvJf3mWiG1dIV5sd-i5uMSqaGSvE6QPXpAVWGYPlowyEilHp5vCN8wuWqCSHcSDk35FtHU-rFJT2xgX2UEXKQH2T-TcJhuqIv2iQg2O4wESonu7gW9biZUh8WWlqXzdNbVxiLC5E20YskcUidjk0PPKd8_3izYi6h1NGG2NELgnoT8",
];

export default function HeroSection({ onBeginWriting }) {
  return (
    <section className="relative min-h-[819px] flex flex-col items-center justify-center pt-10 pb-20">

      {/* Main card */}
      <div className="relative w-full max-w-4xl z-10 transform hover:-translate-y-1 transition-transform duration-500">

        {/* Folder tabs */}
        <div className="absolute -top-6 left-12 w-48 h-12 bg-secondary/20 dark:bg-secondary/10 rounded-t-xl folder-tab z-0" />
        <div className="absolute -top-4 left-32 w-56 h-12 bg-primary/20 dark:bg-primary/10 rounded-t-xl folder-tab z-0" />

        <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-10 md:p-16 shadow-floating dark:shadow-floating-dark border border-secondary/20 dark:border-secondary/40 relative z-10 text-center overflow-hidden">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="material-icons text-sm">stars</span>
            <span>Version 2.0 is here</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 text-stone-900 dark:text-white leading-tight">
            The journal that <br />
            <span className="italic text-primary">learns you.</span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Aura combines mindful reflection with gentle AI recognition to help you uncover
            patterns in your thoughts, moods, and habits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBeginWriting}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Begin Writing
              <span className="material-icons">east</span>
            </button>
            <button className="bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-900 dark:text-white border border-secondary/30 dark:border-secondary/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all w-full sm:w-auto justify-center">
              View Demo
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-4 text-sm text-stone-600 dark:text-stone-400">
            <div className="flex -space-x-2">
              {TRUSTED_USERS.map((src, i) => (
                <img key={i} src={src} alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-stone-800" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-stone-800 bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-600 dark:text-stone-300">
                +
              </div>
            </div>
            <span>Trusted by <strong>50,000+</strong> mindful thinkers</span>
          </div>
        </div>
      </div>

      {/* Decorative floating cards */}
      <div className="absolute top-1/4 left-0 w-32 h-40 bg-white dark:bg-stone-800 shadow-paper dark:shadow-paper-dark rounded-lg rotate-[-12deg] -z-10 p-4 border border-secondary/20 dark:border-secondary/40 hidden lg:block opacity-70">
        <div className="w-full h-2 bg-stone-200 dark:bg-stone-600 rounded mb-2" />
        <div className="w-3/4 h-2 bg-stone-200 dark:bg-stone-600 rounded mb-4" />
        <div className="w-full h-16 bg-secondary/20 rounded" />
      </div>

      <div className="absolute bottom-1/4 right-0 w-48 h-32 bg-white dark:bg-stone-800 shadow-paper dark:shadow-paper-dark rounded-xl rotate-[8deg] -z-10 p-4 border border-secondary/20 dark:border-secondary/40 hidden lg:block opacity-70">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-icons text-primary">mood</span>
          <div className="w-16 h-2 bg-stone-200 dark:bg-stone-600 rounded" />
        </div>
        <div className="flex justify-between items-end mt-2">
          <div className="w-6 h-12 bg-primary/40 rounded-t" />
          <div className="w-6 h-16 bg-primary/60 rounded-t" />
          <div className="w-6 h-10 bg-primary/30 rounded-t" />
          <div className="w-6 h-20 bg-primary/80 rounded-t" />
        </div>
      </div>
    </section>
  );
}