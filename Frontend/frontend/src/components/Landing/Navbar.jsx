import React, { useState, useEffect } from "react";
import { Bot, Menu, X } from "lucide-react";
import { PrimaryButton } from "./ui/Primitives";
import { NAV_LINKS } from "./data/constants";
import { SignInButton, SignUpButton, UserButton,SignedIn, SignedOut } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
// If using Clerk, swap in:
// import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

// adding user data to mongo db
const { user } = useUser();

useEffect(() => {
  if (!user?.id) return;

  fetch("http://localhost:5001/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clerkId: user.id,
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Backend response:", data);
    })
    .catch((error) => {
      console.error("User save error:", error);
    });
}, [user?.id]);



  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.06] bg-black/70 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-2 items-center px-5 sm:px-8 md:grid-cols-3">
        {/* Left: logo */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-[0_0_20px_-2px_rgba(167,139,250,0.85)]">
            <Bot className="h-5 w-5 text-white" strokeWidth={2} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">AI Interview</span>
        </a>

        {/* Center: nav links */}
        <div className="hidden items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-[13.5px] font-medium text-white/65 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: auth (Clerk-ready) */}
        
        <div className="hidden items-center justify-end gap-3 md:flex">

  <SignedOut>
    <SignInButton mode="modal">
      <button className="rounded-lg px-4 py-2 text-[13.5px] font-medium text-white/75 transition-colors duration-200 hover:text-white">
        Login
      </button>
    </SignInButton>

    <SignUpButton mode="modal">
      <PrimaryButton className="!px-5 !py-2.5 !text-[13.5px]">
        Sign Up
      </PrimaryButton>
    </SignUpButton>
  </SignedOut>

  <SignedIn>
    <UserButton />
  </SignedIn>

</div>
        <button
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-black/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/[0.05] hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
           <div className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
             <SignInButton mode="modal">
                 <button className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/80">
                   Login
                 </button>
            </SignInButton>

            <SignUpButton mode="modal">
                <PrimaryButton className="w-full">
                   Sign Up
               </PrimaryButton>
           </SignUpButton>
           <UserButton />
            
          </div>
        </div>
      )}
    </header>
  );
}
export default  Navbar;