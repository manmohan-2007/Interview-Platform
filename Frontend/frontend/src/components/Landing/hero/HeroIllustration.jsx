import React from "react";
import { Bot, BarChart3, Mic } from "lucide-react";
import OrbitNode from "./OrbitNode";
import { ORBIT_ICONS } from "../data/constants";

export default function HeroIllustration() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Connecting Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ORBIT_ICONS.map((node, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="url(#lineGrad)"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      {/* Orbit Icons */}
      <div className="absolute inset-0">
        {ORBIT_ICONS.map((node, i) => (
          <OrbitNode key={i} node={node} />
        ))}
      </div>

      {/* AI Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-violet-400/30 bg-white/[0.04] backdrop-blur-xl sm:h-28 sm:w-28">
          <div
            className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl"
            style={{
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />

          <div className="absolute inset-2 rounded-full border border-white/10" />

          <Bot
            className="h-10 w-10 text-violet-200"
            strokeWidth={1.6}
          />
        </div>
      </div>

      {/* Code Card */}
      <div
        className="pointer-events-auto absolute left-[10%] top-[56%] hidden w-44 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl lg:block"
        style={{
          animation: "float-card 7s ease-in-out infinite",
        }}
      >
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-4/5 rounded bg-violet-400/40" />
          <div className="h-1.5 w-3/5 rounded bg-white/15" />
          <div className="h-1.5 w-full rounded bg-fuchsia-400/30" />
          <div className="h-1.5 w-2/3 rounded bg-white/10" />
        </div>
      </div>

      {/* Analytics Card */}
      <div
        className="pointer-events-auto absolute right-[10%] top-[24%] hidden w-36 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl lg:block"
        style={{
          animation: "float-card 8s ease-in-out infinite",
        }}
      >
        <div className="flex items-center gap-2 text-[10px] text-white/60">
          <BarChart3 className="h-3.5 w-3.5 text-violet-300" />
          Score
        </div>

        <div className="mt-2 flex h-10 items-end gap-1">
          {[35, 55, 70, 82, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded bg-gradient-to-t from-violet-500 to-fuchsia-400"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Voice Badge */}
      <div
        className="pointer-events-auto absolute bottom-[18%] right-[18%] hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl sm:flex"
        style={{
          animation: "float-card 6s ease-in-out infinite",
        }}
      >
        <Mic className="h-3.5 w-3.5 text-violet-300" />

        <div className="flex items-end gap-[2px]">
          {[3, 7, 5, 8, 4].map((h, i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-violet-300"
              style={{ height: `${h * 2}px` }}
            />
          ))}
        </div>
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
    </div>
  );
}