const Hero = () => {
  return (
    <div className="w-full border-b border-zinc-900 pt-10 pb-8 mb-14">
      <h1 className="text-center text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-400 bg-clip-text text-transparent mb-5">
        Master Your Interview
      </h1>

      <p className="text-center text-2xl text-zinc-300 leading-relaxed">
        Ace Your Technical Interviews with
        <span className="text-violet-400 font-semibold">
          {" "}AI-Powered Practice
        </span>
        {" "}and Feedback
      </p>
    </div>
  );
};

export default Hero;