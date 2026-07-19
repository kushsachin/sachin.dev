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
import Seo from "@/components/Seo";
import OneLast from "@/components/OneLast";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Portfolio() {
  const { isDark } = useTheme();

  return (
    <>
      <ToastContainer />

      <Seo
        title="Sachin | Frontend Developer"
        description="4 years and 2 months of experience building scalable web applications with React.js, Next.js & TypeScript. Specialized in REST API integration, UI performance optimization, and crafting responsive user interfaces."
        keywords="Software Front-end Developer, Frontend Developer, React Developer, Next.js Developer, TypeScript, JavaScript, Redux Toolkit, Web Development, UI Optimization, Frontend Engineer, HTML5, CSS3, Tailwind CSS, Material UI"
        url="https://sachindev.vercel.app/"
        image="/assets/img/my-profile.png"
      />
      <div
        className={`relative min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-[#111612] text-[#E2E8F0]" : "bg-white text-[#185693]"
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

          <OneLast />
        </main>
        <Footer />
      </div>
    </>
  );
}
