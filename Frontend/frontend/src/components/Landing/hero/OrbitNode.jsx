import React from "react";

export default function OrbitNode({ node }) {
  const Icon = node.icon;

  return (
    <div
      className="absolute hidden md:flex"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
        animation: `float-card 6s ease-in-out ${node.delay}s infinite`,
      }}
    >
      <div className="group flex flex-col items-center gap-2">
        <div
          className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-black/40
          backdrop-blur-xl
          transition-all
          duration-300
          hover:scale-110
          hover:border-violet-400
          hover:shadow-[0_0_20px_rgba(168,85,247,.4)]
          ${node.color}
          `}
        >
          <Icon
            className="h-5 w-5"
            strokeWidth={2}
          />
        </div>

        <span
          className="
          rounded-full
          bg-black/70
          px-2.5
          py-1
          text-[10px]
          font-medium
          text-white/60
          opacity-0
          transition-all
          duration-300
          group-hover:opacity-100
          "
        >
          {node.label}
        </span>
      </div>
    </div>
  );
}