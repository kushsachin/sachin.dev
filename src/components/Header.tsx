import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        style={{ zIndex: "899" }}
        className={`sticky top-0 z-50 backdrop-blur-md ${
          isDark ? "bg-[#2A271F]/90" : "bg-white/90"
        } border-b ${isDark ? "border-[#B7C7F3]/20" : "border-[#2A271F]/20"}`}
      >
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <span className={isDark ? "text-[#D8FFC0]" : "text-[#B88E6A]"}>
              Sachin
            </span>
            <span className={isDark ? "text-[#B7C7F3]" : "text-[#2A271F]"}>
              .dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-[600]">
            <Link
              href="#skills"
              className={`hover:underline underline-offset-8 ${
                isDark ? "hover:text-[#D8FFC0]" : "hover:text-[#B88E6A]"
              }`}
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className={`hover:underline underline-offset-8 ${
                isDark ? "hover:text-[#D8FFC0]" : "hover:text-[#B88E6A]"
              }`}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className={`hover:underline underline-offset-8 ${
                isDark ? "hover:text-[#D8FFC0]" : "hover:text-[#B88E6A]"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-full focus:outline-none border border-2 ${
                isDark ? "border-[#D8FFC0]" : "border-[#B88E6A]"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX
                  size={22}
                  className={isDark ? "text-[#D8FFC0]" : "text-[#B88E6A]"}
                />
              ) : (
                <FiMenu
                  size={22}
                  className={isDark ? "text-[#D8FFC0]" : "text-[#B88E6A]"}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Now completely outside header */}
      {isMenuOpen && (
        <div
          style={{ zIndex: "999" }}
          className={`md:hidden fixed inset-0 top-15 z-40 ${
            isDark ? "bg-[#2A271F]/80" : "bg-white/80"
          } backdrop-blur-lg`}
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col gap-6 font-[600]">
              <Link
                href="#skills"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${
                  isDark
                    ? "text-[#B7C7F3] hover:text-[#D8FFC0]"
                    : "text-[#2A271F] hover:text-[#B88E6A]"
                }`}
              >
                Skills
              </Link>
              <Link
                href="#projects"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${
                  isDark
                    ? "text-[#B7C7F3] hover:text-[#D8FFC0]"
                    : "text-[#2A271F] hover:text-[#B88E6A]"
                }`}
              >
                Projects
              </Link>
              <Link
                href="#contact"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${
                  isDark
                    ? "text-[#B7C7F3] hover:text-[#D8FFC0]"
                    : "text-[#2A271F] hover:text-[#B88E6A]"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
