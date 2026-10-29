import React from "react";

export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 self-center rounded-full border border-violet-400/20 bg-violet-500/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-300/80 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.7)]" />
      {children}
    </span>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] bg-left px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_10px_30px_-8px_rgba(139,92,246,0.7)] transition-all duration-500 hover:bg-right hover:shadow-[0_0_0_1px_rgba(196,181,253,0.55),0_14px_40px_-6px_rgba(139,92,246,0.9)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-white/[0.07] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/** Thin gradient-border wrapper: outer gradient bg + 1px padding reveals a hairline border */
export function GradientBorder({ children, className = "", from = "from-white/15", to = "to-white/0" }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${from} via-white/[0.04] ${to} p-px ${className}`}>
      <div className="h-full rounded-[15px] bg-black">{children}</div>
    </div>
  );
}
