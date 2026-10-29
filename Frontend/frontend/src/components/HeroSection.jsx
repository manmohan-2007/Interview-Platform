import robot from "../assets/images.jpg";
import TopicCard from "./TopicCard";

const HeroSection = ({ selectedTopic }) => {
  return (
    <section
      className="
      grid
      grid-cols-1
      lg:grid-cols-[46%_54%]
      items-center
      gap-4
      lg:gap-5
      "
    >
      {/* Left */}
      <div className="relative flex items-center justify-center">

        {/* Glow */}
        <div
          className="
          absolute
          w-[300px]
          h-[300px]
          lg:w-[360px]
          lg:h-[360px]
          rounded-full
          bg-violet-600/20
          blur-[90px]
          "
        />

        <img
          src={robot}
          alt="AI Robot"
          className="
          relative
          z-10

          w-[240px]
          sm:w-[300px]
          md:w-[360px]
          lg:w-[460px]
          xl:w-[530px]

          h-auto
          object-contain

          drop-shadow-[0_0_60px_rgba(139,92,246,.8)]
          "
        />
      </div>

      {/* Right */}
      <div
        className="
        rounded-[28px]
       
        bg-gradient-to-b
        from-white/[0.05]
        to-white/[0.02]

        backdrop-blur-xl
        sm:text-center 
        lg:text-left
        px-8
        lg:px-10

        py-8
        lg:py-8

        shadow-[0_0_30px_rgba(0,0,0,.25)]
        "
      >
        {/* Badge */}
        <div
          className="
          inline-flex
          items-center

          rounded-full

          border
         border-violet-500/40

          bg-violet-500/10

          px-5
          py-2

          text-xs
          sm:text-sm

          font-semibold

          tracking-[2px]

          text-violet-300
          "
        >
          WELCOME TO AI INTERVIEW
        </div>

        {/* Heading */}
        <h1
          className="
          mt-5

          text-3xl
          sm:text-4xl
          lg:text-[48px]

          font-black
          leading-tight
          "
        >
          Practice Smarter.
          <br />

          <span className="text-violet-500">
            Perform Better.
          </span>
        </h1>

        {/* Description */}
        <p
          className="
          mt-5

          text-sm
          sm:text-base
          lg:text-[17px]
           
          leading-7

          text-zinc-300
          "
        >
          Experience real interview scenarios with our AI interviewer.

          <br />

          Answer naturally, get instant feedback and improve your communication skills.
        </p>

        {/* Topic */}
        <div className="mt-10 flex flex-col items-center lg:items-start">

             <p
               className="
               mb-4
               text-xs
               tracking-[4px]
               text-violet-400
               text-center
               lg:text-left
              "
            >
            SELECTED TOPIC
           </p>

           <TopicCard
              selectedTopic={selectedTopic}
           />

        </div>

        </div>
    </section>
  );
};

export default HeroSection;