import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code2,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Trophy,
  Flame,
  ArrowRight,
} from "lucide-react";


const difficultyStyle = {
  Easy: "text-emerald-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const CodingPlatform = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5001/problems"
        );

        const data = await response.json();

        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);
  if (loading) {
  return (
    <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
      Loading problems...
    </div>
  );
   }

  return (
    <div className="min-h-screen bg-[#050507] text-white px-6 py-8 md:px-10 lg:px-14">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-[0_0_25px_rgba(139,92,246,0.35)]">
              <Code2 size={22} />
            </div>

            <span className="text-sm font-medium uppercase tracking-[0.25em] text-violet-300">
             Stuf Coding
            </span>
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Practice.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Solve. Improve.
            </span>
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Sharpen your coding skills with real interview problems.
          </p>
        </div>

        {/* Profile Stats */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-orange-300">
              <Flame size={18} />
              <span className="font-semibold">7 Day Streak</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-violet-300">
              <Trophy size={18} />
              <span className="font-semibold">42 Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8 rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-500/[0.08] to-fuchsia-500/[0.04] p-6 shadow-[0_0_40px_-20px_rgba(139,92,246,0.5)]">

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Your Progress</h2>
            <p className="mt-1 text-sm text-white/40">
              Keep solving problems to improve your skills.
            </p>
          </div>

          <span className="text-sm font-semibold text-violet-300">
            42 / 100
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.7)]" />
        </div>

        <div className="mt-4 flex gap-6 text-xs text-white/50">
          <span>Easy: 25</span>
          <span>Medium: 14</span>
          <span>Hard: 3</span>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            placeholder="Search problems..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500/50 focus:bg-white/[0.05]"
          />
        </div>

        <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:border-violet-500/40 hover:text-white">
          <Filter size={17} />
          Filters
        </button>
      </div>

      {/* Problems */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">

        {/* Table Header */}
        <div className="hidden grid-cols-[50px_1fr_130px_150px_100px] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-wider text-white/30 md:grid">
          <span></span>
          <span>Problem</span>
          <span>Difficulty</span>
          <span>Topic</span>
          <span></span>
        </div>

        {problems.map((problem) => (
          <div
            key={problem.problem_id}
            className="group grid grid-cols-1 gap-4 border-b border-white/[0.06] px-6 py-5 transition hover:bg-violet-500/[0.04] md:grid-cols-[50px_1fr_130px_150px_100px] md:items-center"
          >
            {/* Status */}
            <div>
              {problem.solved ? (
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
              ) : (
                <Circle
                  size={20}
                  className="text-white/20"
                />
              )}
            </div>

            {/* Problem */}
            <div>
              <h3 className="font-medium transition group-hover:text-violet-300">
                {problem.problem_id}. {problem.title}
              </h3>
            </div>

            {/* Difficulty */}
            <div className={`text-sm ${difficultyStyle[problem.difficulty]}`}>
              {problem.difficulty}
            </div>

            {/* Topic */}
            <div>
              <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50">
                {problem.topics?.[0]}
              </span>
            </div>

            {/* Solve */}
            <button 
            onClick={()=> navigate(`/coding/problems/${problem.problem_id}`)}
            className="flex items-center gap-1 text-sm text-violet-300 transition hover:text-fuchsia-300">
              Solve
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingPlatform;