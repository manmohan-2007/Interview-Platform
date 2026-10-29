import React from "react";
import { Bot } from "lucide-react";
import { FOOTER_LINKS } from "./data/constants";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_0_20px_-2px_rgba(167,139,250,0.8)]">
              <Bot className="h-4 w-4 text-white" strokeWidth={2} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-white">AI Interview</span>
          </a>

          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-[13.5px] text-white/45 transition-colors duration-200 hover:text-violet-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[12.5px] text-white/30">© 2026 AI Interview. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;