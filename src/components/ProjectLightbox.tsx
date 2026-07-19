// src/components/ProjectLightbox.tsx
import { Dialog } from "@headlessui/react";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

interface TechnologyMetric {
  value: string;
  label: string;
}

interface ProjectLinks {
  demo?: string;
  repo?: string | null;
}

interface Project {
  id: number;
  title: string;
  role: string;
  timeframe: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  metrics: TechnologyMetric[];
  links: ProjectLinks;
}

interface ProjectLightboxProps {
  project: Project;
  children: ReactNode;
}

export default function ProjectLightbox({
  project,
  children,
}: ProjectLightboxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDark } = useTheme();

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.3
                }}
                className={`relative rounded-2xl max-w-5xl w-full mx-4 py-8 px-0 shadow-2xl ${isDark
                  ? "bg-gradient-to-br from-[#151c16] to-[#1a221b] border border-white/[0.08]"
                  : "bg-gradient-to-br from-white to-gray-50 border border-[#111612]/20"
                  }`}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`absolute top-1 right-1 z-10 p-2 rounded-full transition-all duration-300 ${isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/10 hover:rotate-90"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 hover:rotate-90"
                    }`}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="grid lg:grid-cols-5 gap-6 px-8 overflow-y-auto h-[70vh]">
                  {/* Left Column - Image & Details */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Image Section - Now Larger */}
                    <div className="relative group">
                      <div className={`relative rounded-xl overflow-hidden border ${isDark ? "border-white/[0.08]" : "border-gray-200"
                        }`}>
                        <div className="relative w-full">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={500}
                            className="w-full object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-[#111612]/60"
                        }`}>
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isDark
                              ? "bg-[#93C5FD]/10 text-[#93C5FD] border border-[#93C5FD]/20 hover:bg-[#93C5FD]/20"
                              : "bg-[#185693]/10 text-[#185693] border border-[#185693]/20 hover:bg-[#185693]/20"
                              }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div>
                      <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-[#111612]/60"
                        }`}>
                        Key Metrics
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {project.metrics.map((metric, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3 rounded-xl text-center border transition-all duration-300 hover:scale-105 ${isDark
                              ? "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.08] hover:border-[#93C5FD]/30"
                              : "bg-gray-50 border-gray-100 hover:bg-white hover:border-[#185693]/30 shadow-sm"
                              }`}
                          >
                            <p className={`font-bold text-2xl ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
                              }`}>
                              {metric.value}
                            </p>
                            <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-[#111612]/70"
                              }`}>
                              {metric.label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h2 className={`text-2xl font-bold leading-tight ${isDark ? "text-white" : "text-[#185693]"
                          }`}>
                          {project.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${isDark
                          ? "bg-[#93C5FD]/10 text-[#93C5FD]"
                          : "bg-[#185693]/10 text-[#185693]"
                          }`}>
                          {project.role}
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${isDark ? "text-slate-400" : "text-[#111612]/70"
                          }`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.timeframe}
                        </span>
                      </div>
                      <div className={`p-4 rounded-xl ${isDark ? "bg-white/[0.03]" : "bg-gray-50"
                        }`}>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-[#111612]/80"
                          }`}>
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? "text-slate-400" : "text-[#111612]/60"
                        }`}>
                        Key Features
                      </h3>
                      <ul className="space-y-2.5">
                        {project.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-start gap-2.5 text-sm ${isDark ? "text-slate-300" : "text-[#111612]/90"
                              }`}
                          >
                            <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${isDark ? "bg-[#93C5FD]/20" : "bg-[#185693]/20"
                              }`}>
                              <svg className={`w-2.5 h-2.5 ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      {project.links.demo && (
                        <motion.a
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${isDark
                            ? "bg-[#93C5FD] text-[#111612] hover:bg-[#93C5FD]/90 hover:shadow-[#93C5FD]/20 shadow-[#93C5FD]/10"
                            : "bg-[#185693] text-white hover:bg-[#185693]/90 hover:shadow-[#185693]/20 shadow-[#185693]/10"
                            }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Live Demo
                        </motion.a>
                      )}
                      {project.links.repo && (
                        <motion.a
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center justify-center gap-2 ${isDark
                            ? "bg-white/[0.03] text-[#93C5FD] border-[#93C5FD]/20 hover:bg-white/[0.08] hover:border-[#93C5FD]/40"
                            : "bg-[#185693]/10 text-[#185693] border-[#185693]/20 hover:bg-[#185693]/20 hover:border-[#185693]/40"
                            }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          View Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}