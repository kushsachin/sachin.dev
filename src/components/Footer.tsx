/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { motion } from "framer-motion";

const FooterSection = ({
  title,
  children,
  isDark,
}: {
  title: string;
  children: React.ReactNode;
  isDark: boolean;
}) => (
  <div className="space-y-3">
    <h3
      className={`text-lg font-semibold pb-2 ${
        isDark
          ? "border-[#D8FFC0]/30 text-[#D8FFC0]"
          : "border-[#185693]/30 text-[#185693]"
      }`}
    >
      {title}
    </h3>
    {children}
  </div>
);

const SocialIcon = ({
  icon: Icon,
  href,
  label,
  isDark,
}: {
  icon: any;
  href: string;
  label: string;
  isDark: boolean;
}) => (
  <motion.a
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-3 rounded-lg transition-all ${
      isDark
        ? "bg-[#2A271F]/50 hover:bg-[#D8FFC0]/10 text-[#B7C7F3] hover:text-[#D8FFC0]"
        : "bg-white/50 hover:bg-[#B88E6A]/10 text-[#2A271F] hover:text-[#B88E6A]"
    }`}
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
);

export default function Footer() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer
      className={`py-6 border-t ${
        isDark ? "border-[#B7C7F3]/20" : "border-[#2A271F]/20"
      }`}
    >
      

      <div className="container mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Details */}
          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold pb-2 ${
                isDark
                  ? "border-[#D8FFC0]/30 text-[#D8FFC0]"
                  : "border-[#185693]/30 text-[#185693]"
              }`}
            >
              Contact Me
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FiMail
                  className={isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"}
                />
                <a
                  href="mailto:usachin017@gmail.com"
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-[#B7C7F3]/80 hover:text-[#D8FFC0]"
                      : "text-[#2A271F]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  usachin017@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone
                  className={isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"}
                />
                <a
                  href="tel:+919169388485"
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-[#B7C7F3]/80 hover:text-[#D8FFC0]"
                      : "text-[#2A271F]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  +91 9169388485
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin
                  className={isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"}
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-[#B7C7F3]/80" : "text-[#2A271F]/80"
                  }`}
                >
                  Lucknow, Uttar Pradesh
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold pb-2 ${
                isDark
                  ? "border-[#D8FFC0]/30 text-[#D8FFC0]"
                  : "border-[#185693]/30 text-[#185693]"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#skills"
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-[#B7C7F3]/80 hover:text-[#D8FFC0]"
                      : "text-[#2A271F]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-[#B7C7F3]/80 hover:text-[#D8FFC0]"
                      : "text-[#2A271F]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className={`text-sm hover:underline ${
                    isDark
                      ? "text-[#B7C7F3]/80 hover:text-[#D8FFC0]"
                      : "text-[#2A271F]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  Experience
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Theme */}
          <FooterSection title="Connect With Me" isDark={isDark}>
            <div className="flex flex-wrap gap-3">
              <SocialIcon
                icon={FiGithub}
                href="https://github.com/kushsachin"
                label="GitHub"
                isDark={isDark}
              />
              <SocialIcon
                icon={FiLinkedin}
                href="https://linkedin.com/in/kushsachin"
                label="LinkedIn"
                isDark={isDark}
              />
              <SocialIcon
                icon={FiPhone}
                href="tel:+919169388485"
                label="Call Me"
                isDark={isDark}
              />

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-3 rounded-lg transition-all ${
                  isDark
                    ? "bg-[#2A271F]/50 hover:bg-[#D8FFC0]/10 text-[#B7C7F3] hover:text-[#D8FFC0]"
                    : "bg-white/50 hover:bg-[#B88E6A]/10 text-[#2A271F] hover:text-[#B88E6A]"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button>
            </div>
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#B7C7F3]/10 text-center">
          <p
            className={`text-xs ${
              isDark ? "text-[#B7C7F3]/70" : "text-[#2A271F]/70"
            }`}
          >
            © {new Date().getFullYear()} Sachin Kushwaha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
