import { Mic } from "lucide-react";
import interviewer from "../assets/ai_avatar.webp";

const QuestionCard = ({ question, questionNumber,  aiStatus, }) => {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-violet-500/20 bg-zinc-900 shadow-[0_0_40px_rgba(139,92,246,0.15)]">

      {/* Header */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-zinc-800">

        <span className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-semibold tracking-wide">
          Question {questionNumber} / 5
        </span>

        <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold tracking-wide">
          AI Interview
        </span>

      </div>

      {/* Interviewer */}
      <div className="flex flex-col items-center py-12">

        <div className="relative">

          <div className="absolute inset-0 rounded-full bg-violet-500 blur-[60px] opacity-50 animate-pulse"></div>

          <img
            src={interviewer}
            alt="AI Interviewer"
            className="relative w-32 h-32 rounded-full border-4 border-violet-500 object-cover shadow-[0_0_35px_rgba(139,92,246,0.7)]"
          />

        </div>

        <h2 className="mt-6 text-3xl font-black tracking-wide text-white">
          Natalie
        </h2>

        <p className="mt-3 text-xs uppercase tracking-[6px] text-zinc-400">
          Senior AI Interviewer
        </p>

        <div
  className={`mt-6 px-6 py-2 rounded-full border flex items-center gap-3 transition-all duration-300
    ${
      aiStatus === "Speaking"
        ? "bg-green-500/10 border-green-500/30"
        : aiStatus === "Listening"
        ? "bg-blue-500/10 border-blue-500/30"
        : aiStatus === "Recording"
        ? "bg-red-500/10 border-red-500/30"
        : "bg-yellow-500/10 border-yellow-500/30"
    }`}
>
  <div
    className={`w-3 h-3 rounded-full animate-pulse
      ${
        aiStatus === "Speaking"
          ? "bg-green-400"
          : aiStatus === "Listening"
          ? "bg-blue-400"
          : aiStatus === "Recording"
          ? "bg-red-400"
          : "bg-yellow-400"
      }`}
  ></div>

  <span
    className={`font-semibold
      ${
        aiStatus === "Speaking"
          ? "text-green-400"
          : aiStatus === "Listening"
          ? "text-blue-400"
          : aiStatus === "Recording"
          ? "text-red-400"
          : "text-yellow-400"
      }`}
  >
    {aiStatus}...
  </span>
</div>

      </div>

      {/* Question Section */}
      <div className="px-8 pb-10">

        <div className="mt-6 rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-900 to-black px-10 py-9 shadow-2xl">

          <p className="uppercase tracking-[5px] text-violet-400 text-sm font-bold mb-8">
            💬 Interview Question
          </p>

          <p className=" text-[25px] font-bold leading-[45px] tracking-wide text-white">
            {question}
          </p>

        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-3 text-zinc-400">

          <Mic size={20} />

          <span className="text-base">
            Speak naturally and answer confidently using the microphone below.
          </span>

        </div>

      </div>

    </div>
  );
};

export default QuestionCard;