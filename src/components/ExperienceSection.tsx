import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? "bg-[#1E1E1E]" : "bg-[#F8F9FA]"
      }`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient circles with more visibility */}
        <div
          className={`absolute top-0 -left-40 w-[500px] h-[500px] rounded-full ${
            isDark ? "opacity-[0.15] blur-[80px]" : "opacity-[0.35] blur-[80px]"
          } ${isDark ? "bg-[#D8FFC0]" : "bg-[#185693]"}`}
        />
        <div
          className={`absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full ${
            isDark ? "opacity-[0.25] blur-[80px]" : "opacity-[0.80] blur-[80px]"
          } ${isDark ? "bg-[#B88E6A]" : "bg-[#B7C7F3]"}`}
        />

        {/* Diagonal grid pattern with better visibility */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${
            isDark
              ? "bg-[url('/assets/grid-dark.svg')]"
              : "bg-[url('/assets/grid-light.svg')]"
          }`}
        />

        {/* Subtle noise texture */}
        <div
          className={`absolute inset-0 opacity-[0.02] ${
            isDark
              ? "bg-[url('/assets/noise-dark.png')]"
              : "bg-[url('/assets/noise-light.png')]"
          }`}
        />
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div
            className={`inline-flex items-center mb-4 gap-3 px-4 py-2 bg-[#B7C7F3]/20 rounded-full border ${
              isDark ? "border-[#B7C7F3]/40" : "border-[#2A271F]/40"
            }`}
          >
            <span
              className={`text-sm font-semibold ${
                isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
              }`}
            >
              Professional Journey
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-[#B88E6A]" : "text-[#2A271F]"
            }`}
          >
            Work Experience
          </h2>
          <p
            className={`text-lg ${
              isDark ? "text-[#D8FFC0]/80" : "text-[#185693]"
            }`}
          >
            Key roles and contributions throughout my career
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div
            className={`absolute left-4 top-0 h-full w-0.5 ${
              isDark ? "bg-[#D8FFC0]/20" : "bg-[#185693]/20"
            }`}
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10 mb-16 last:mb-0 group"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-[5px] top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  isDark
                    ? "bg-gradient-to-br from-[#D8FFC0] to-[#B88E6A]"
                    : "bg-gradient-to-br from-[#185693] to-[#B7C7F3]"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDark ? "bg-[#2A271F]" : "bg-white"
                  }`}
                />
              </div>

              {/* Experience card */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                  isDark
                    ? "bg-[#2A271F]/90 hover:shadow-[0_8px_30px_rgba(216,255,192,0.1)]"
                    : "bg-white/90 hover:shadow-[0_8px_30px_rgba(24,86,147,0.1)]"
                }`}
              >
                {/* Card content remains the same */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-[#D8FFC0]" : "text-[#185693]"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <span
                        className={`font-medium ${
                          isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                        }`}
                      >
                        {exp.company}
                      </span>
                      <span
                        className={`text-sm ${
                          isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
                        }`}
                      >
                        • {exp.location} • {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* All Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-[#D8FFC0]/10 text-[#D8FFC0]"
                          : "bg-[#185693]/10 text-[#185693]"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Concise Achievements */}
                <ul className="space-y-3 mb-6">
                  {exp.achievements.map((ach, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <span
                        className={`mr-3 mt-0.5 ${
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
                    </motion.li>
                  ))}
                </ul>

                {/* Metrics */}
                {exp.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {exp.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`p-3 rounded-lg text-center ${
                          isDark
                            ? "bg-[#1E1E1E] border border-[#D8FFC0]/10"
                            : "bg-[#F8F9FA] border border-[#185693]/10"
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
                          className={`text-xs mt-1 ${
                            isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
                          }`}
                        >
                          {metric.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
