import React from "react";
import { useTheme } from "../context/ThemeContext";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/ExperienceSection";
import GitHubContributions from "@/components/GitHubContributions";
import ProjectsSection from "@/components/ProjectsSection";
import BackToTop from "@/components/BackToTop";

export default function Portfolio() {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? "bg-[#2A271F] text-[#B88E6A]" : "bg-white text-[#185693]"
      }`}
    >
      {/* Header */}
      <Header />
      <BackToTop />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* GitHub Contributions */}
        <GitHubContributions />

        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
