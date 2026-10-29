import React from "react";
import { Eyebrow } from "./ui/Primitives";
import { COMMUNITY } from "./data/constants";

function CommunityCard({ item }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      target="_blank"
       rel="noopener noreferrer"
      className={`group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${item.glow}`}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-transform duration-300 group-hover:scale-110 ${item.tint}`}>
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-white">{item.name}</p>
        <p className="mt-1 text-[12px] text-white/40">{item.desc}</p>
      </div>
    </a>
  );
}

const Community = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
  <Eyebrow>Stay Connected</Eyebrow>

  <h2 className="mt-5 w-full text-center text-3xl font-bold tracking-tight text-white sm:text-5xl">
    Join the Community
  </h2>

  <p className="mt-4 max-w-xl text-center text-[15px] leading-7 text-white/60">
    Keep learning between sessions — the same platforms most candidates already trust.
  </p>
</div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COMMUNITY.map((item) => (
            <CommunityCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default Community;