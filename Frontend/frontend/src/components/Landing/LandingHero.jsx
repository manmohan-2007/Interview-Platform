import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
} from "./ui/Primitives";
import HeroIllustration from "./hero/HeroIllustration";

const LandingHero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="top"
      className="
      relative
      flex
      min-h-[78vh]
      items-center
      justify-center
      overflow-hidden
      pt-20
      pb-12
      "
    >
      <HeroIllustration />

      <div
        className="
        relative
        z-10
        mx-auto
        max-w-4xl
        px-6
        py-16
        text-center
        sm:px-8
        "
      >
        <Eyebrow>
          One Platform · Every Round
        </Eyebrow>

        <h1
          className="
          mx-auto
          mt-5
          max-w-3xl
          text-5xl
          font-semibold
          leading-tight
          tracking-tight
          text-white
          sm:text-6xl
          lg:text-6xl
          "
        >
          Master Your{" "}
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
            Technical Interviews
          </span>
        </h1>

        <p
          className="
          mx-auto
          mt-5
          max-w-2xl
          text-[17px]
          leading-8
          text-white/60
          "
        >
          Practice Coding, Non-Coding, AI, Communication, and Technical
          interviews using one intelligent AI platform.
        </p>

        <div
          className="
          mt-8
          flex
          flex-col
          items-center
          justify-center
          gap-4
          sm:flex-row
          "
        >
          <PrimaryButton onClick={() => navigate("/interview")}>
            AI Interview
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate("/coding")}>
            <Play className="h-4 w-4" />
            Coding Copilot
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;