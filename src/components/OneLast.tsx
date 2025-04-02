import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import DownloadButton from "./DownloadButton";

function OneLast() {
  const { isDark } = useTheme();

  return (
    <section
      id="contact"
      className={`relative overflow-hidden py-8 md:py-15 ${
        isDark
          ? "bg-gradient-to-br from-[#2A271F] to-[#1A1A1A]"
          : "bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]"
      }`}
    >
      {/* Content Container with higher z-index */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 bg-[#B7C7F3]/20 rounded-full border ${
                isDark ? "border-[#B7C7F3]/80" : "border-[#2A271F]/80"
              } mb-4`}
            >
              <span className="w-3 h-3 rounded-full bg-[#6cdb28] animate-pulse"></span>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                }`}
              >
                Open for new projects and opportunities
              </span>
            </div>

            <h1
              className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${
                isDark ? "text-[#D8FFC0]" : "text-[#185693]"
              } mb-4`}
            >
              <span className="block">{`Let's Create Something`}</span>
              <span
                className={`bg-gradient-to-r ${
                  isDark
                    ? "from-[#B88E6A] via-[#D8FFC0] to-[#B7C7F3]"
                    : "from-[#9a7555] via-[#6cdb28] to-[#13487A]"
                } bg-clip-text text-transparent`}
              >
                Remarkable Together
              </span>
            </h1>

            <p
              className={`text-base md:text-lg mx-auto ${
                isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
              } max-w-4xl mb-4`}
            >
              {`I specialize in crafting premium web experiences for businesses and startups. Whether you need a skilled developer for your team or project, I'm open to collaborations - let's connect and explore how we can create something exceptional together.`}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              
              <DownloadButton 
                fileUrl="/assets/Sachin_Front-end_Developer_Resume.pdf"
                fileName="Sachin_Front-end_Developer_Resume.pdf"
                buttonText="Download Resume"
                className="custom-class-if-needed"
                />
              <a
                href="https://www.linkedin.com/in/kushsachin"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 transition-all ${
                  isDark
                    ? "border-[#D8FFC0] text-[#D8FFC0] hover:bg-[#D8FFC0]/10"
                    : "border-[#185693] text-[#185693] hover:bg-[#185693]/10"
                } font-medium`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent to-[#B7C7F3]/5 w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {`Let's Connect`}
                  <FiLinkedin size={18} />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {/* First floating orb - more dynamic movement */}
        <motion.div
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px] ${
            isDark ? "bg-[#B7C7F3]/30" : "bg-[#185693]/50"
          }`}
          initial={{ scale: 0.9 }}
          animate={{
            x: [0, 40, 20, 30, 0],
            y: [0, 30, 50, 20, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Second orb - complementary movement */}
        <motion.div
          className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-[90px] ${
            isDark ? "bg-[#D8FFC0]/30" : "bg-[#B88E6A]/50"
          }`}
          initial={{ scale: 0.8 }}
          animate={{
            x: [0, -50, -30, -40, 0],
            y: [0, -40, -20, -30, 0],
            scale: [1, 0.9, 1.15, 0.95, 1],
            rotate: [0, -8, 5, -3, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Subtle connecting particles (dark mode only) */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  isDark ? "bg-[#D8FFC0]/40" : "bg-[#185693]/40"
                }`}
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 60],
                  y: [0, (Math.random() - 0.5) * 60],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
      </div>
    </section>
  );
}

export default OneLast;
