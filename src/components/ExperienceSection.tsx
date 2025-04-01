// src/components/ExperienceSection.js
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  const { isDark } = useTheme();

  return (
    <section
      className={`container mx-auto px-6 py-[40px] md:py-[50px] lg:py-[60px] relative overflow-hidden ${
        isDark ? "bg-[#2A271F]" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 ${
            isDark ? "text-[#D8FFC0]" : "text-[#B88E6A]"
          }`}
        >
          Professional Journey
        </h2>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative pl-6 md:pl-8 border-l-2 ${
                isDark ? "border-[#D8FFC0]/40" : "border-[#185693]/40"
              }`}
            >
              {/* Timeline dot */}
              {/* <div
                className={`absolute w-5 h-5 rounded-full -left-[10px] top-0 ${
                  isDark ? "bg-[#D8FFC0]" : "bg-[#185693]"
                }`}
              /> */}

              <div
                className={`absolute w-5 h-5 rounded-full -left-[10px] top-0 ${
                  isDark
                    ? "bg-gradient-to-br from-[#D8FFC0] to-[#B88E6A]"
                    : "bg-gradient-to-br from-[#185693] to-[#B7C7F3]"
                }`}
              />

              {/* Company header */}
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
                <h3
                  className={`inline-flex gap-2 items-center text-xl md:text-2xl font-bold ${
                    isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                  }`}
                >
                  {exp.company} <span className="hidden md:inline"> | </span>
                </h3>

                <span
                  className={`text-sm ${
                    isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
                  }`}
                >
                  {exp.location} • {exp.duration}
                </span>
              </div>

              {/* Role tag */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  isDark
                    ? "bg-[#B88E6A]/20 text-[#D8FFC0]"
                    : "bg-[#185693]/20 text-[#185693]"
                }`}
              >
                {exp.role}
              </span>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      isDark
                        ? "bg-[#B7C7F3]/10 text-[#B7C7F3] border-[#B7C7F3]/80"
                        : "bg-[#B7C7F3]/10 text-[#2A271F] border-[#2A271F]/80"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <ul className="space-y-3 mb-6">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start">
                    <span
                      className={`mr-2 mt-0 ${
                        isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                      }`}
                    >
                      ▹
                    </span>
                    <span
                      className={`${
                        isDark ? "text-[#B7C7F3]/90" : "text-[#2A271F]/90"
                      }`}
                    >
                      {ach}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Metrics */}
              <div className="flex flex-wrap gap-4 mt-6">
                {exp.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -3,
                      transition: { duration: 0.2 },
                    }}
                    className={`px-4 py-2 rounded-lg cursor-default ${
                      isDark
                        ? "bg-[#2A271F] border border-[#B88E6A]/30 hover:shadow-[0_4px_14px_rgba(216,255,192,0.15)]"
                        : "bg-white border border-[#185693]/30 hover:shadow-[0_4px_14px_rgba(24,86,147,0.15)]"
                    }`}
                  >
                    <p
                      className={`text-2xl font-bold ${
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
