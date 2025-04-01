// src/components/ProjectLightbox.tsx
import { Dialog } from "@headlessui/react";
import { ReactNode, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

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
        // whileHover={{ y: -5 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        {children}
      </motion.div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-lg"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <div
            className="fixed inset-0 bg-black/70 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`relative rounded-xl max-w-4xl w-full mx-4 p-6 sm:p-8 shadow-2xl ${
              isDark
                ? "bg-[#2A271F] border border-[#B7C7F3]/20"
                : "bg-white border border-[#2A271F]/20"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-4 right-4 text-2xl transition-colors ${
                isDark
                  ? "text-[#B7C7F3] hover:text-[#D8FFC0]"
                  : "text-[#2A271F] hover:text-[#185693]"
              }`}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {project.image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}

                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                    }`}
                  >
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs ${
                          isDark
                            ? "bg-[#B7C7F3]/10 text-[#B7C7F3] border border-[#B7C7F3]/20"
                            : "bg-[#185693]/10 text-[#185693] border border-[#185693]/20"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                    }`}
                  >
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg text-center ${
                          isDark ? "bg-[#2A271F]/50" : "bg-gray-100"
                        }`}
                      >
                        <p
                          className={`font-bold text-xl ${
                            isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                          }`}
                        >
                          {metric.value}
                        </p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
                          }`}
                        >
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                    }`}
                  >
                    {project.title}
                  </h2>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-sm ${
                        isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                      }`}
                    >
                      {project.role}
                    </span>
                    <span
                      className={`text-xs ${
                        isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
                      }`}
                    >
                      {project.timeframe}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                    }`}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex items-start text-sm ${
                          isDark ? "text-[#B7C7F3]/90" : "text-[#2A271F]/90"
                        }`}
                      >
                        <span
                          className={`mr-2 mt-1 ${
                            isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                          }`}
                        >
                          •
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  {project.links.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-md transition-colors ${
                        isDark
                          ? "bg-[#D8FFC0] text-[#2A271F] hover:bg-[#D8FFC0]/90"
                          : "bg-[#185693] text-white hover:bg-[#185693]/90"
                      }`}
                    >
                      Live Demo
                    </motion.a>
                  )}
                  {project.links.repo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-md transition-colors ${
                        isDark
                          ? "bg-[#B7C7F3]/10 text-[#B7C7F3] border border-[#B7C7F3]/20 hover:bg-[#B7C7F3]/20"
                          : "bg-[#185693]/10 text-[#185693] border border-[#185693]/20 hover:bg-[#185693]/20"
                      }`}
                    >
                      View Code
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}
