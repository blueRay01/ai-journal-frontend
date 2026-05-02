// src/pages/AuthPage.jsx
import { useState } from "react";

function EmailField() {
  return (
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-2"
      >
        Email
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
          mail
        </span>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full bg-white/50 backdrop-blur-sm border border-outline-variant/30 text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl py-3 pl-12 pr-4 transition-all outline-none text-base"
        />
      </div>
    </div>
  );
}

function PasswordField({ showForgot }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center ml-2">
        <label
          htmlFor="password"
          className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant"
        >
          Password
        </label>
        {showForgot && (
          <a href="#" className="text-xs font-bold tracking-widest uppercase text-primary hover:text-on-secondary-container transition-colors">
            Forgot?
          </a>
        )}
      </div>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
          lock
        </span>
        <input
          id="password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          className="w-full bg-white/50 backdrop-blur-sm border border-outline-variant/30 text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl py-3 pl-12 pr-12 transition-all outline-none text-base"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">
            {visible ? "visibility" : "visibility_off"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <div className="bg-background min-h-screen flex items-center justify-center relative overflow-hidden font-body text-on-background px-4">

      {/* Ambient orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 sm:w-[500px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 sm:w-[600px] sm:h-[600px] bg-secondary-container/30 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />

      {/* Grain overlay */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <main className="relative z-10 w-full max-w-sm sm:max-w-md">

        {/* Brand header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary mb-2">
            Aura Journal
          </h1>
          <p className="text-base text-on-surface-variant">Enter your sanctuary.</p>
        </div>

        {/* Glassmorphic card */}
        <div className="bg-white/40 backdrop-blur-3xl rounded-2xl border border-white/60 shadow-[0_40px_80px_-20px_rgba(83,97,72,0.1)] p-6 sm:p-8 relative overflow-hidden">

          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          <div className="relative z-10">

            {/* Tab toggle — sliding pill */}
            <div className="relative bg-surface-container/50 backdrop-blur-md p-1 rounded-full flex mb-8 border border-white/30">
              {/* Sliding pill indicator */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-sm transition-transform duration-300 ease-in-out ${
                  tab === "signup" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
                }`}
              />
              <button
                onClick={() => setTab("login")}
                className={`relative flex-1 py-2 text-center rounded-full text-sm font-medium transition-colors duration-300 ${
                  tab === "login" ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => setTab("signup")}
                className={`relative flex-1 py-2 text-center rounded-full text-sm font-medium transition-colors duration-300 ${
                  tab === "signup" ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <EmailField />
              <PasswordField showForgot={tab === "login"} />

              {/* Confirm password — only on signup */}
              {tab === "signup" && (
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
                      lock
                    </span>
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/50 backdrop-blur-sm border border-outline-variant/30 text-on-surface placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl py-3 pl-12 pr-4 transition-all outline-none text-base"
                    />
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                className="w-full bg-primary hover:bg-on-secondary-container text-on-primary font-semibold py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(83,97,72,0.4)] hover:shadow-[0_15px_25px_-10px_rgba(83,97,72,0.5)] flex items-center justify-center gap-2 group mt-2"
              >
                {tab === "login" ? "Continue to Journal" : "Create Account"}
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center mt-8 space-x-4">
          <a href="#" className="text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <span className="text-outline-variant">•</span>
          <a href="#" className="text-xs font-bold tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </main>
    </div>
  );
}