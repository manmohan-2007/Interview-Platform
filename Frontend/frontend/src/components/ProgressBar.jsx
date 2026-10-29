const ProgressBar = ({ questionNumber, totalQuestions = 5 }) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-zinc-300">
          Interview Progress
        </h3>

        <span className="text-sm text-violet-400 font-semibold">
          {questionNumber} / {totalQuestions}
        </span>
      </div>

      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-zinc-500">
        {Math.round(progress)}% Completed
      </p>

    </div>
  );
};

export default ProgressBar;