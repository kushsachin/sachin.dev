import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiArrowRight,
  FiBriefcase,
  FiPhone,
} from "react-icons/fi";

export default function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section className="container mx-auto px-6 py-16 md:py-[60px] lg:py-[60px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Text Content */}
        <div className="text-left lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 bg-[#B7C7F3]/20 rounded-full border ${
                isDark ? "border-[#B7C7F3]/80" : "border-[#2A271F]/80"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#6cdb28] animate-pulse"></span>
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                }`}
              >
                Available for opportunities
              </span>
            </div>

            <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
              <span
                className={`${
                  isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"
                } block`}
              >
                {`Hello, I'm `}
              </span>
              <span className="bg-gradient-to-r from-[#B88E6A] via-[#D8FFC0] to-[#B7C7F3] bg-clip-text text-transparent block">
                Sachin | Frontend Developer
              </span>
              {/* <span className={`text-xl md:text-2xl text-[#B88E6A] dark:text-[#D8FFC0] block mt-2`}></span> */}
            </h1>

            <p
              className={`text-lg text-justify lg:text-left md:text-xl ${
                isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
              }  max-w-2xl`}
            >
              Crafting dynamic web experiences with React.js and Next.js.
              Passionate about clean code, performance optimization, and
              intuitive UI/UX.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col mb-2 sm:flex-row gap-4 pt-1"
          >
            {/* Warm Brown Primary Button */}
            <a
              href="#contact"
              className="group relative flex items-center justify-center gap-2 bg-[#B88E6A] hover:bg-[#9a7555] text-white px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#B7C7F3]/20 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
              <span className="relative z-10 font-medium flex items-center gap-2">
                Get In Touch
                <FiArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>

            <a
              href="#projects"
              className={`flex justify-center items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${
                isDark
                  ? "border-[#D8FFC0] text-[#D8FFC0] hover:bg-[#D8FFC0]/5"
                  : "border-[#185693] text-[#185693] hover:bg-[#185693]/5"
              } font-medium`}
            >
              <FiBriefcase
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              View Portfolio
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="pt-5"
          >
            <div className="mb-6">
              <p
                className={`text-lg uppercase tracking-widest ${
                  isDark ? "text-[#B7C7F3]/90" : "text-[#B88E6A]/90"
                } mb-[0.5px] relative inline-block font-[600]`}
              >
                Connect with me
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`w-[130px] h-[1px] mx-auto md:mx-0 mt-0 origin-left ${
                  isDark ? "bg-[#D8FFC0]" : "bg-[#B88E6A]"
                }`}
              ></motion.div>
            </div>

            <div
              className={`flex gap-5 ${
                isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
              } `}
            >
              {[
                {
                  icon: <FiMail size={22} />,
                  href: "mailto:usachin017@gmail.com",
                  label: "Email",
                },
                {
                  icon: <FiLinkedin size={22} />,
                  href: "https://linkedin.com/in/kushsachin",
                  label: "LinkedIn",
                },
                {
                  icon: <FiGithub size={22} />,
                  href: "https://github.com/kushsachin",
                  label: "GitHub",
                },
                {
                  icon: <FiPhone size={22} />,
                  href: "tel:+919169388485",
                  label: "Call Me",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`p-3 rounded-xl border border-2 ${
                    isDark
                      ? "bg-[#2A271F]/30 border-[#B7C7F3]/80 hover:border-[#D8FFC0]/50"
                      : "bg-white/30 border-[#2A271F]/80 hover:border-[#B88E6A]/50"
                  } backdrop-blur-sm transition-all duration-300 group relative`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`${
                      isDark
                        ? "group-hover:text-[#D8FFC0]"
                        : "group-hover:text-[#B88E6A]"
                    } transition-colors duration-300`}
                  >
                    {item.icon}
                  </span>
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#B88E6A]/5 to-[#D8FFC0]/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Illustration */}
        <div className="lg:w-[50%]">
          <motion.div
            className="relative lg:w-[80%]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            <div
              style={{ zIndex: "799" }}
              className="relative w-full max-w-xl aspect-square mx-auto overflow-visible"
            >
              {/* Enhanced gradient backgrounds with animation */}
              <motion.div
                initial={{ rotate: 3 }}
                animate={{ rotate: 6 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-br 
    from-[#B7C7F3]/50 via-[#D8FFC0]/40 to-[#B88E6A]/30 
    dark:from-[#2A271F]/50 dark:via-[#B88E6A]/25 dark:to-[#D8FFC0]/15 
    rounded-[3rem] z-0"
              ></motion.div>

              <motion.div
                initial={{ rotate: 4 }}
                animate={{ rotate: -8 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-bl 
    from-[#D8FFC0]/40 via-[#B7C7F3]/35 to-[#B88E6A]/30 
    dark:from-[#B88E6A]/25 dark:via-[#2A271F]/40 dark:to-[#B7C7F3]/15 
    rounded-[3rem] z-0"
              ></motion.div>
              {/* Enhanced Profile Image with hover animation */}
              <motion.div
                className="relative w-full h-full z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Image
                  src="/assets/img/my-profile.png"
                  alt="Sachin Kushwaha - Frontend Developer"
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-[0_20px_35px_rgba(183,199,243,0.3)] dark:drop-shadow-[0_20px_35px_rgba(42,39,31,0.4)] w-full h-full rounded-[3rem]"
                  priority
                  quality={100}
                />
              </motion.div>
            </div>

            {/* Decorative animated circles */}
            <motion.div
              className="absolute bottom-[-23px] right-[-82px] hidden lg:block"
              style={{ zIndex: "899" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative w-40 h-40">
                <motion.div
                  className="absolute inset-0 border-2 border-[#B88E6A]/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute inset-4 border-2 border-[#D8FFC0] rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute inset-8 border-2 border-[#B7C7F3]/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
