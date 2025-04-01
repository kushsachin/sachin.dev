import GitHubCalendar from "react-github-calendar";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function GitHubContributions() {
  const { isDark } = useTheme();
  const username = "kushsachin";

  return (
    <section className="container mx-auto px-6 py-16 md:py-[60px] lg:py-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? "text-[#D8FFC0]" : "text-[#185693]"
            } mb-4`}
          >
            Code Contributions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`text-lg ${
              isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
            } max-w-2xl mx-auto`}
          >
            My GitHub activity visualized - a testament to consistent
            development and open-source contributions
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className={`p-6 md:p-8 rounded-xl border-2 ${
            isDark
              ? "bg-[#2A271F]/30 border-[#B7C7F3]/20"
              : "bg-white/30 border-[#2A271F]/20"
          } backdrop-blur-sm shadow-lg`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={`flex items-center justify-between mb-6 ${
              isDark ? "text-[#D8FFC0]" : "text-[#185693]"
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-lg font-medium">@{username}</span>
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
              }`}
            >
              Last 12 months
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <GitHubCalendar
              username={username}
              colorScheme={isDark ? "dark" : "light"}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
              blockRadius={5}
              theme={{
                light: ["#f0f0f0", "#c8e6c9", "#81c784", "#4caf50", "#2e7d32"],
                dark: ["#161b22", "#0a2d1e", "#005a2b", "#008d3f", "#00c853"],
              }}
              style={{
                width: "100%",
                margin: "0 auto",
                color: isDark ? "#B7C7F3" : "#2A271F",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, staggerChildren: 0.1 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
        >
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
              isDark
                ? "border-[#D8FFC0] text-[#D8FFC0] hover:bg-[#D8FFC0]/5"
                : "border-[#185693] text-[#185693] hover:bg-[#185693]/5"
            } font-medium`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Full Profile
          </motion.a>

          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              isDark
                ? "bg-[#D8FFC0]/5 text-[#D8FFC0] hover:bg-[#D8FFC0]/12"
                : "bg-[#185693]/5 text-[#185693] hover:bg-[#185693]/12"
            } font-medium`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM4 6H11V11H4V6ZM20 6H13V11H20V6ZM4 13H11V18H4V13ZM13 13H20V18H13V13Z"
              />
            </svg>
            View Repositories
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
