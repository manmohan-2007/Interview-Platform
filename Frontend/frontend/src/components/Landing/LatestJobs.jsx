import React from "react";
import { MapPin, Wallet, Briefcase, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "./ui/Primitives";
import { JOBS } from "./data/constants";

function JobCard({ job }) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/25 hover:bg-white/[0.045] hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.5)]">
      <div>
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${job.color} text-sm font-bold text-white shadow-[0_4px_14px_-2px_rgba(139,92,246,0.5)]`}>
            {job.initial}
          </div>
          <div>
            <p className="text-[13px] font-medium text-white/50">{job.company}</p>
            <p className="text-[14.5px] font-semibold text-white">{job.role}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4 text-[12.5px] text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-violet-300/70" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-violet-300/70" />
            {job.salary}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-violet-300/70" />
            {job.exp}
          </span>
        </div>
      </div>

      <button className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-white/80 transition-all duration-300 hover:border-violet-300/30 hover:bg-violet-500/10 hover:text-white">
        Apply Now
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

const LatestJobs = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[140px]" />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>Fresh Roles, Updated Daily</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem]">
            Latest Job Opportunities
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.map((job, i) => (
            <JobCard key={`${job.company}-${i}`} job={job} />
          ))}
        </div>

        <p className="mt-8 text-center text-[12px] text-white/30">
          Job listings shown are placeholder data — live roles will populate this section via RapidAPI.
        </p>
      </div>
    </section>
  );
}
export default LatestJobs;