import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { skills } from "@/data/skills";

export default function SkillsSection() {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className="relative overflow-hidden container my-5 mx-auto px-6 py-[50px] md:py-[60px] lg:py-[70px]"
    >
      <div
        className={`absolute inset-0 ${isDark
            ? "opacity-[10%] bg-[radial-gradient(#93C5FD_1px,transparent_1px)]"
            : "opacity-[15%] bg-[radial-gradient(#185693_1.5px,transparent_1.5px)]"
          } bg-[size:20px_20px]`}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="space-y-12"
      >
        <div className="text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-sm uppercase tracking-widest ${isDark ? "text-[#ffffff]/90" : "text-[#111612]/90"
              } font-medium mb-2 inline-block`}
          >
            My Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`text-3xl md:text-4xl font-bold ${isDark ? "text-[#93C5FD]" : "text-[#B88E6A]"
              }`}
          >
            Technical Skills
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={`w-[35%] lg:w-[10%] h-1 mx-auto md:mx-0 mt-4 origin-center lg:origin-left ${isDark ? "bg-[#93C5FD]" : "bg-[#B88E6A]"
              }`}
          ></motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.05 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className={`group relative p-3 rounded-lg border-2 ${isDark
                  ? "bg-[#111612]/30 border-[#93C5FD]/60 hover:border-[#93C5FD]/50"
                  : "bg-white/30 border-[#111612]/60 hover:border-[#B88E6A]/50"
                } backdrop-blur-sm transition-all duration-300`}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              <div className="flex flex-col items-center gap-3">
                <skill.icon
                  size={24}
                  className={`${isDark
                      ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                      : "text-[#111612] group-hover:text-[#B88E6A]"
                    } transition-colors duration-300`}
                />
                <div className="text-center">
                  <span
                    className={`text-sm font-medium ${isDark
                        ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                        : "text-[#111612] group-hover:text-[#B88E6A]"
                      }`}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
