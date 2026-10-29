import { Mic } from "lucide-react";

const MicSection = ({ selectedTopic }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">

      {/* Mic Circle */}

      <div className="relative">

        {/* Glow */}

        <div className="absolute inset-0 rounded-full bg-violet-600 blur-3xl opacity-20"></div>

        {/* Circle */}

        <div
          className="
          relative
          w-44
          h-44
          rounded-full
          bg-zinc-900
          border
          border-zinc-800
          flex
          items-center
          justify-center
          shadow-2xl
        "
        >
          <Mic className="w-16 h-16 text-zinc-300" />
        </div>

      </div>

      {/* Text */}

      <h2 className="mt-10 text-5xl font-bold text-violet-400">
        Ready to Practice?
      </h2>

      <p className="mt-4 text-2xl text-zinc-400">
        {selectedTopic
          ? `Selected Topic : ${selectedTopic}`
          : "Select a topic from the sidebar to begin"}
      </p>

    </div>
  );
};

export default MicSection;