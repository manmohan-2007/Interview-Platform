import HeroSection from "./HeroSection";
import FeatureCards from "./FeatureCards";
import StartButton from "./StartButton";

const StartScreen = ({
  selectedTopic,
  onStart,
}) => {
  return (
    <div className="w-full px-4 py-4 lg:px-6 overflow-hidden">

      <div
        className="
        relative
        w-full
        max-w-[1500px]
        mx-auto
        overflow-hidden

        rounded-[32px]
        lg:rounded-[36px]

        border
        border-violet-500/20

        bg-gradient-to-br
        from-[#090611]
        via-[#06020d]
        to-[#020203]

        shadow-[0_0_50px_rgba(168,85,247,.20)]
        "
      >

        {/* Background Glow */}

        <div
          className="
          absolute
          -top-24
          -left-24
          h-72
          w-72
          rounded-full
          bg-violet-600/10
          blur-[120px]
          "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          h-80
          w-80
          rounded-full
          bg-fuchsia-600/10
          blur-[120px]
          "
        />

        {/* Main Content */}

        <div className="relative z-10 p-15">

          <HeroSection
            selectedTopic={selectedTopic}
          />

          <FeatureCards />

          <div className="mt-12 border-t border-white/10" />

          <StartButton
            onStart={onStart}
          />

        </div>

      </div>

    </div>
  );
};

export default StartScreen;