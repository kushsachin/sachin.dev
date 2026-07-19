import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import ProjectLightbox from "@/components/ProjectLightbox";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const { isDark } = useTheme();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className="container mx-auto px-6 py-15"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-3xl text-center md:text-4xl font-bold mb-12 ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
            }`}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectLightbox key={project.id} project={project}>
              <motion.div
                variants={item}
                className={`group relative cursor-pointer rounded-xl p-6 border-2 backdrop-blur-sm ${isDark
                  ? "bg-white/[0.02] border-white/[0.08] hover:border-[#93C5FD]/40"
                  : "bg-white/30 border-[#111612]/20 hover:border-[#185693]/50"
                  } transition-all h-full flex flex-col`}
                whileHover={{
                  // y: -5,
                  boxShadow: isDark
                    ? "0 10px 25px -5px rgba(147, 197, 253, 0.05)"
                    : "0 10px 25px -5px rgba(24, 86, 147, 0.1)",
                }}
              >
                {/* Project Image */}
                <motion.div
                  className="mb-6 overflow-hidden rounded-lg relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={280}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </motion.div>

                {/* Project Header */}
                <div className="mb-4">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-[#B88E6A]"
                      }`}
                  >
                    {project.title}
                  </motion.h3>
                  <div className="flex items-center justify-between mb-3">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`text-sm font-medium ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
                        }`}
                    >
                      {project.role}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className={`text-sm ${isDark ? "text-slate-400" : "text-[#111612]/60"
                        }`}
                    >
                      {project.timeframe}
                    </motion.span>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm text-justify ${isDark ? "text-slate-300" : "text-[#111612]/80"
                      }`}
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Tech Stack */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-5 items-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + idx * 0.03 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${isDark
                        ? "bg-[#93C5FD]/10 text-[#93C5FD] border border-[#93C5FD]/20"
                        : "bg-[#185693]/10 text-[#185693] border border-[#185693]/20"
                        }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Project Metrics */}
                <motion.div
                  className={`flex justify-between border-t pt-4 min-h-[78px] ${isDark ? "border-white/[0.08]" : "border-[#111612]/10"}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ marginTop: 'auto' }}
                >
                  {project.metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="text-center p-1"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.35 + idx * 0.1 }}
                    >
                      <p
                        className={`text-xl font-bold ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
                          }`}
                      >
                        {metric.value}
                      </p>
                      <p
                        className={`text-xs ${isDark ? "text-slate-400" : "text-[#111612]/70"
                          }`}
                      >
                        {metric.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </ProjectLightbox>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
