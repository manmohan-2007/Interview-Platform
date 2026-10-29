import {
  Code2,
  Terminal,
  Braces,
  Palette,
  Server,
  Zap,
  Leaf,
  Database,
  GitBranch,
  UserCircle2,
  Sparkles,
  Mic,
  BarChart3,
  Brain,
  MessageSquareText,
  

  Trophy,
  Code,
  Hash,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
export const NAV_LINKS = [
  { label: "Coding Copilot", href: "/coding" },
  { label: "Non-Coding Copilot", href: "/interview" },
];

export const ORBIT_ICONS = [
  { icon: Braces, label: "JavaScript", color: "text-amber-300" },
  { icon: Code2, label: "React", color: "text-cyan-300" },
  { icon: Terminal, label: "Python", color: "text-yellow-200" },
  { icon: Code2, label: "HTML", color: "text-orange-300" },
  { icon: Palette, label: "CSS", color: "text-sky-300" },
  { icon: Server, label: "Node.js", color: "text-emerald-300" },
  { icon: Zap, label: "Express.js", color: "text-violet-200" },
  { icon: Leaf, label: "MongoDB", color: "text-green-300" },
  { icon: Database, label: "SQL", color: "text-blue-300" },
  { icon: GitBranch, label: "DSA", color: "text-fuchsia-300" },
  { icon: UserCircle2, label: "Self Intro", color: "text-pink-300" },
  { icon: Sparkles, label: "AI", color: "text-violet-300" },
].map((item, i, arr) => {
  const angle = (360 / arr.length) * i;

  const radius = i % 2 === 0 ? 24 : 30;

  const rad = (angle * Math.PI) / 180;

  return {
    ...item,
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
    delay: i * 0.2,
  };
});
export const FEATURES = [
  { icon: Code, title: "Coding Interviews", desc: "Live coding rounds with real-time hints, complexity checks, and edge-case prompts." },
  { icon: MessageSquareText, title: "Non-Coding Interviews", desc: "HR, behavioral, and system-design rounds that mirror how panels actually probe." },
  { icon: Brain, title: "AI Mock Interviews", desc: "A full adaptive interview loop — question, answer, follow-up — run entirely by AI." },
  { icon: Zap, title: "Instant Feedback", desc: "Structured scoring on correctness, clarity, and confidence the moment you finish." },
  { icon: Mic, title: "Voice-Based Interview", desc: "Answer out loud and get evaluated on delivery, not just what you typed." },
  { icon: BarChart3, title: "Personalized Learning", desc: "A track that reshapes itself around your weakest rounds, session after session." },
];

export const JOBS = [
  { company: "Nimbus Systems", initial: "N", color: "from-violet-500 to-fuchsia-500", role: "Frontend Engineer, React", location: "Bengaluru, IN · Remote", salary: "₹18L – ₹26L / yr", exp: "2–4 yrs" },
  { company: "Corelight Labs", initial: "C", color: "from-cyan-500 to-blue-500", role: "Backend Engineer, Node.js", location: "Hyderabad, IN", salary: "₹15L – ₹22L / yr", exp: "1–3 yrs" },
  { company: "Vertex Analytics", initial: "V", color: "from-amber-500 to-orange-500", role: "Data Engineer, SQL/Python", location: "Pune, IN · Hybrid", salary: "₹20L – ₹30L / yr", exp: "3–5 yrs" },
  { company: "Northgate AI", initial: "N", color: "from-emerald-500 to-teal-500", role: "Applied ML Engineer", location: "Remote · Global", salary: "Not disclosed", exp: "4+ yrs" },
  { company: "Fable Studio", initial: "F", color: "from-pink-500 to-rose-500", role: "Full-Stack Engineer, MERN", location: "Gurugram, IN", salary: "₹12L – ₹18L / yr", exp: "0–2 yrs" },
  { company: "Ledger & Co", initial: "L", color: "from-indigo-500 to-violet-500", role: "SDE II, Distributed Systems", location: "Bengaluru, IN", salary: "₹28L – ₹40L / yr", exp: "4–6 yrs" },
];

export const COMMUNITY = [
  { icon: FaLinkedin, name: "LinkedIn",href: "https://www.linkedin.com/", desc: "Follow updates & network", glow: "hover:shadow-[0_0_40px_-8px_rgba(56,132,255,0.55)] hover:border-blue-400/40", tint: "text-blue-300" },
  { icon: FaGithub, name: "GitHub",href: "https://github.com/", desc: "Explore open-source tools", glow: "hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.35)] hover:border-white/30", tint: "text-white/80" },
  { icon: Code, name: "LeetCode", href: "https://leetcode.com/",desc: "Sharpen your DSA edge", glow: "hover:shadow-[0_0_40px_-8px_rgba(255,161,22,0.5)] hover:border-orange-400/40", tint: "text-orange-300" },
  { icon: Hash, name: "HackerRank", href: "https://www.hackerrank.com/",desc: "Certify your skills", glow: "hover:shadow-[0_0_40px_-8px_rgba(34,197,148,0.5)] hover:border-emerald-400/40", tint: "text-emerald-300" },
  { icon: Trophy, name: "GeeksforGeeks",href: "https://www.geeksforgeeks.org/", desc: "Read & revise concepts", glow: "hover:shadow-[0_0_40px_-8px_rgba(74,222,128,0.5)] hover:border-green-400/40", tint: "text-green-300" },
];

export const FOOTER_LINKS = ["Resources", "About", "Privacy", "Terms", "Contact", "GitHub", "LinkedIn", "LeetCode"];
