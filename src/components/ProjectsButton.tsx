import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { FiGrid } from "react-icons/fi"; // Changed from FiLinkedin to FiGrid

const ProjectsButton = () => {
  const { isDark } = useTheme();

  return (
    <motion.a
      href="#projects"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 ${
        isDark
          ? "border-[#D8FFC0] text-[#D8FFC0] hover:bg-[#D8FFC0]/10"
          : "border-[#185693] text-[#185693] hover:bg-[#185693]/2"
      } font-medium overflow-hidden`}
    >
      {/* Animated background layer */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 flex items-center gap-2"
      >
        View Projects
        <FiGrid size={18} />
      </motion.span>

      {/* Glow effect */}
      <span
        className={`absolute -inset-1 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark ? "bg-[#D8FFC0]/10" : "bg-[#185693]/10"
        }`}
      />
    </motion.a>
  );
};

export default ProjectsButton;
