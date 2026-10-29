const FeedbackCard = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 rounded-2xl bg-zinc-900 border border-zinc-800 p-8 shadow-xl">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Interview Completed 🎉
        </h2>

        <p className="text-zinc-400 mt-2">
          Here's your AI evaluation.
        </p>
      </div>

      <div className="mt-8 text-center">
        <p className="text-zinc-400">Overall Score</p>

        <h1 className="text-6xl font-bold text-violet-500 mt-2">
          {feedback.candidate_score}/5
        </h1>
      </div>

      <div className="mt-10 rounded-xl bg-zinc-800/60 p-6">
        <h3 className="text-green-400 text-xl font-semibold mb-4">
          ✅ Feedback
        </h3>

        <p className="text-zinc-300 leading-7">
          {feedback.feedback}
        </p>
      </div>

      <div className="mt-8 rounded-xl bg-zinc-800/60 p-6">
        <h3 className="text-yellow-400 text-xl font-semibold mb-4">
          📈 Areas of Improvement
        </h3>

        <p className="text-zinc-300 leading-7">
          {feedback.areas_of_improvement}
        </p>
      </div>

    </div>
  );
};

export default FeedbackCard;