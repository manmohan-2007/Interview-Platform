import { Brain, Mic, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Voice Interview",
    description:
      "Practice naturally with voice-based interviews that simulate real hiring conversations.",
    icon: Mic,
  },
  {
    title: "AI Questions",
    description:
      "Every question is intelligently generated based on your previous responses and selected topic.",
    icon: Brain,
  },
  {
    title: "Smart Feedback",
    description:
      "Receive detailed AI insights, strengths, improvements and overall interview performance.",
    icon: BarChart3,
  },
];

const FeatureCards = () => {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center ">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
             group
             relative
             flex
             flex-col
             w-[290px]
             sm:w-[340px]
             md:w-[380px]
             lg:w-full
             items-center
             justify-center
              rounded-[28px]
             border
             border-white/10
             bg-gradient-to-b
             from-[#171222]
             to-[#0b0913]
             px-6
             py-6
             lg:px-10 
             lg:py-10
             text-center
             transition-all
             duration-300
             hover:-translate-y-2
             hover:border-violet-500/60
             hover:shadow-[0_0_35px_rgba(168,85,247,.30)]
              "
            >
              {/* Glow */}
              <div
                className="
                absolute
                -top-16
                -right-16
                h-40
                w-40
                rounded-full
                bg-violet-500/10
                blur-3xl
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
                "
              />

              {/* Icon */}
              <div
                className="
                relative
                mx-auto
                my-auto
                flex
                h-16
                w-16
                mb-4
                lg:h-20
                lg:w-20
                lg:mb-7
                items-center
                justify-center
                rounded-full
                border
                border-violet-500/30
                bg-violet-500/10
                text-violet-400
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:bg-violet-500/20
                "
              >
                <Icon size={26} 
                className="lg:w-8 lg:h-8"/>
              </div>

              {/* Title */}
              <h3
                className="
                mt-3
                lg:mt-7
                text-center
                text-2xl
                font-bold
                text-white
                "
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="
                mx-auto
                mt-4
                leading-6
                lg:mt-6
                max-w-[270px]
                text-center
                text-[15px]
                lg:leading-7
                text-zinc-400
                "
              >
                {item.description}
              </p>

              {/* Bottom Line */}
              <div
                className="
                mx-auto
                mt-4
                lg:mt-7
                h-[3px]
                w-12
                rounded-full
                bg-gradient-to-r
                from-violet-500
                to-fuchsia-500
                "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCards;