import { Brain, ChevronDown } from "lucide-react";

const TopicCard = ({ selectedTopic }) => {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-2xl
      
      w-full
      max-w-[520px]
      mx-auto
      border
      border-violet-500/40
      bg-[#120d1f]
      px-6
      py-5
      flex
      sm:text-center
      items-center
      justify-between
      transition-all
      duration-300
      hover:border-violet-400
      hover:shadow-[0_0_30px_rgba(168,85,247,.7)]
      hover:-translate-y-1
      cursor-pointer
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
        bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,.18),transparent_55%)]
        "
      />

      <div className="relative  flex items-center gap-5 mb-4 mt-4">
        <div
          className="
          w-14
          h-14
          m-5
          rounded-2xl
          bg-violet-500/15
          border
          border-violet-500/20
          flex
          items-center
          justify-center

          "
        >
          <Brain
            size={28}
            className="text-violet-400"
          />
        </div>

        <div>
          <p className="text-[13px] uppercase tracking-[3px] text-zinc-500 mt-3">
            Current Topic
          </p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {selectedTopic || "Self Introduction"}
          </h3>
        </div>
      </div>

      <ChevronDown
        size={24}
        className="
        relative
        text-violet-400
        transition-transform
        duration-300
        group-hover:rotate-180
        "
      />
    </div>
  );
};

export default TopicCard;