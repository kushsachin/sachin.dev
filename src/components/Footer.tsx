/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
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
          ? "text-[#93C5FD] border-b border-[#93C5FD]/30"
          : "text-[#185693] border-b border-[#185693]/30"
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
        ? "bg-[#111612]/50 hover:bg-[#93C5FD]/10 text-[#93C5FD] hover:text-[#93C5FD]"
        : "bg-white/50 hover:bg-[#B88E6A]/10 text-[#111612] hover:text-[#B88E6A]"
    }`}
    aria-label={label}
  >
    <Icon size={20} />
  </motion.a>
);

export default function Footer() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer
      className={`py-4 border-t ${
        isDark ? "border-[#93C5FD]/20" : "border-[#111612]/20"
      }`}
    >
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Details */}
          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold pb-2 ${
                isDark
                  ? "text-[#93C5FD] border-b border-[#93C5FD]/30"
                  : "text-[#185693] border-b border-[#185693]/30"
              }`}
            >
              Contact Me
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 py-0.5 group">
                <FiMail
                  className={
                    isDark
                      ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                      : "text-[#111612] group-hover:text-[#B88E6A]"
                  }
                />
                <a
                  href="mailto:usachin017@gmail.com"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-[#93C5FD]/80 hover:text-[#93C5FD]"
                      : "text-[#111612]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  usachin017@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 py-0.5 group">
                <FiMapPin
                  className={
                    isDark
                      ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                      : "text-[#111612] group-hover:text-[#B88E6A]"
                  }
                />
                <span
                  className={`text-sm ${
                    isDark ? "text-[#93C5FD]/80" : "text-[#111612]/80"
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
                  ? "text-[#93C5FD] border-b border-[#93C5FD]/30"
                  : "text-[#185693] border-b border-[#185693]/30"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 py-0.5 group">
                <FiArrowRight
                  className={
                    isDark
                      ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                      : "text-[#111612] group-hover:text-[#B88E6A]"
                  }
                />
                <Link
                  href="#skills"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-[#93C5FD]/80 hover:text-[#93C5FD]"
                      : "text-[#111612]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  Skills
                </Link>
              </li>
              <li className="flex items-center gap-3 py-0.5 group">
                <FiArrowRight
                  className={
                    isDark
                      ? "text-[#93C5FD] group-hover:text-[#93C5FD]"
                      : "text-[#111612] group-hover:text-[#B88E6A]"
                  }
                />
                <Link
                  href="#projects"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-[#93C5FD]/80 hover:text-[#93C5FD]"
                      : "text-[#111612]/80 hover:text-[#B88E6A]"
                  }`}
                >
                  Projects
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
              {/* <SocialIcon
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
                    ? "bg-[#111612]/50 hover:bg-[#93C5FD]/10 text-[#93C5FD] hover:text-[#93C5FD]"
                    : "bg-white/50 hover:bg-[#B88E6A]/10 text-[#111612] hover:text-[#B88E6A]"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button> */}
            </div>
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#93C5FD]/10 text-center">
          <p
            className={`text-xs ${
              isDark ? "text-[#93C5FD]/70" : "text-[#111612]/70"
            }`}
          >
            © {new Date().getFullYear()} Sachin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
