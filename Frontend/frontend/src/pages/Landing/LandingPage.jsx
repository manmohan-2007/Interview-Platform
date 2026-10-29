import React from "react";
import "../../components/Landing/landing.css";
import Navbar from "../../components/Landing/Navbar";
import LandingHero from "../../components/Landing/LandingHero";
import FeatureSection from "../../components/Landing/FeatureSection";
import LatestJobs from "../../components/Landing/LatestJobs";
import Community from"../../components/Landing/Community";
import Footer from "../../components/Landing/Footer";

const LandingPage = () => {
  return (
    <div className="landing-root min-h-screen bg-black font-sans text-white antialiased selection:bg-violet-500/30 selection:text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.14),transparent)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <Navbar />
      <main>
        <LandingHero />
        <FeatureSection />
        <LatestJobs />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
export default LandingPage;