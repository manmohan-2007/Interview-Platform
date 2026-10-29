import React from "react";
import { Eyebrow, GradientBorder } from "./ui/Primitives";
import { FEATURES } from "./data/constants";

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  return (
    <GradientBorder className="group transition-transform duration-400 hover:-translate-y-1.5">
      <div className="relative h-full overflow-hidden rounded-[15px] bg-black/60 p-7 backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/0 blur-3xl transition-all duration-500 group-hover:bg-violet-500/[0.14]" />
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-500/[0.08] text-violet-300">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <h3 className="mt-5 text-[15.5px] font-semibold text-white">{feature.title}</h3>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/45">{feature.desc}</p>
      </div>
    </GradientBorder>
  );
}

const FeatureSection = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Feature Highlights</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem]">
            Every round, one adaptive engine
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default FeatureSection;
