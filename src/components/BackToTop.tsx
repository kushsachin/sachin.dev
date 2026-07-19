import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import React from "react";

export default function BackToTop() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-2 rounded-full backdrop-blur-[3px] border-2 ${
        isDark ? "border-[#93C5FD]/20" : "border-[#111612]/20"
      } shadow-sm hover:shadow-md transition-all ${
        isDark ? "bg-[#111612]/70" : "bg-white/70"
      }`}
      aria-label="Back to top"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex: 999 }}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
        >
          <FiArrowUp
            size={22}
            strokeWidth={2.5}
            className={isDark ? "text-[#93C5FD]" : "text-[#185693]"}
          />
        </motion.div>
      </div>
    </motion.button>
  );
}