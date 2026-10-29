import { ArrowRight } from "lucide-react";

const StartButton = ({ onStart }) => {
  return (
    <section className="mt-14 flex flex-col items-center">

      <p className="text-zinc-400 text-lg mb-6">
        Ready to begin your interview?
      </p>

      <button
        onClick={onStart}
        className="
        group
        relative

        flex
        items-center
        justify-center

        w-full
        max-w-[380px]
        h-[68px]

        overflow-hidden
        rounded-2xl

        border
        border-violet-400/30

        bg-gradient-to-r
        from-[#6D28D9]
        via-[#7C3AED]
        to-[#C026D3]

        text-white
        text-xl
        font-bold

        shadow-[0_0_35px_rgba(139,92,246,.45)]

        transition-all
        duration-300

        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_0_60px_rgba(168,85,247,.9)]
        active:scale-[0.98]
        "
      >
        {/* Glow */}

        <div
          className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,.18),transparent_70%)]
          "
        />

        {/* Shine */}

        <div
          className="
          absolute
          -left-1/2
          top-0
          h-full
          w-1/2
          -skew-x-12
          bg-white/20
          transition-all
          duration-700
          group-hover:left-[120%]
          "
        />

        {/* Text */}

        <span className="relative z-10">
          Start AI Interview
        </span>

        {/* Arrow */}

        <ArrowRight
          size={22}
          className="
          absolute
          right-6
          z-10
          transition-all
          duration-300
          group-hover:translate-x-2
          "
        />
      </button>

    </section>
  );
};

export default StartButton;