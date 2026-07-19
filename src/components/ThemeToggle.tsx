import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  console.log(isDark);
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-1 rounded-full backdrop-blur-lg border border-2 ${
        isDark ? "border-[#B88E6A]/80" : "border-[#185693]/80"
      }  shadow-sm hover:shadow-md transition-all`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex: "999" }}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          {isDark ? (
            <FiSun size={22} strokeWidth={2.5} />
          ) : (
            <FiMoon size={22} strokeWidth={2.5} />
          )}
        </motion.div>
      </div>
      {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6]/10 to-[#93C5FD]/10 dark:from-[#111612]/20 dark:to-[#B88E6A]/10 opacity-0 hover:opacity-100 transition-opacity"></div> */}
    </motion.button>
  );
}
