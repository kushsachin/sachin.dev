import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const isColorTheoryActive = router.pathname === "/color-theory";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        style={{ zIndex: "899" }}
        className={`sticky top-0 z-50 backdrop-blur-md ${isDark ? "bg-[#111612]/90" : "bg-white/90"
          } border-b ${isDark ? "border-[#93C5FD]/20" : "border-[#111612]/20"}`}
      >
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <span className={isDark ? "text-[#93C5FD]" : "text-[#185693]"}>
              Sachin
            </span>
            <span className={isDark ? "text-[#ffffff]" : "text-[#111612]"}>
              .dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-[600]">
            <Link
              href="/#skills"
              className={`hover:underline underline-offset-8 ${isDark ? "hover:text-[#93C5FD]" : "hover:text-[#B88E6A]"
                }`}
            >
              Skills
            </Link>
            <Link
              href="/#projects"
              className={`hover:underline underline-offset-8 ${isDark ? "hover:text-[#93C5FD]" : "hover:text-[#B88E6A]"
                }`}
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className={`hover:underline underline-offset-8 ${isDark ? "hover:text-[#93C5FD]" : "hover:text-[#B88E6A]"
                }`}
            >
              Contact
            </Link>
            {/* <Link
              href="/color-theory"
              className={`hover:underline underline-offset-8 ${
                isColorTheoryActive
                  ? isDark ? "text-[#93C5FD] underline" : "text-[#B88E6A] underline"
                  : isDark ? "text-[#ffffff]/90 hover:text-[#93C5FD]" : "text-[#111612]/90 hover:text-[#B88E6A]"
              }`}
            >
              Color Lab
            </Link> */}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-full focus:outline-none border border-2 ${isDark ? "border-[#93C5FD]" : "border-[#B88E6A]"
                }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FiX
                  size={22}
                  className={isDark ? "text-[#93C5FD]" : "text-[#B88E6A]"}
                />
              ) : (
                <FiMenu
                  size={22}
                  className={isDark ? "text-[#93C5FD]" : "text-[#B88E6A]"}
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
          className={`md:hidden fixed inset-0 top-15 z-40 ${isDark ? "bg-[#111612]/80" : "bg-white/80"
            } backdrop-blur-lg`}
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col gap-6 font-[600]">
              <Link
                href="/#skills"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${isDark
                  ? "text-[#93C5FD] hover:text-[#93C5FD]"
                  : "text-[#111612] hover:text-[#B88E6A]"
                  }`}
              >
                Skills
              </Link>
              <Link
                href="/#projects"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${isDark
                  ? "text-[#93C5FD] hover:text-[#93C5FD]"
                  : "text-[#111612] hover:text-[#B88E6A]"
                  }`}
              >
                Projects
              </Link>
              <Link
                href="/#contact"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${isDark
                  ? "text-[#93C5FD] hover:text-[#93C5FD]"
                  : "text-[#111612] hover:text-[#B88E6A]"
                  }`}
              >
                Contact
              </Link>
              {/* <Link
                href="/color-theory"
                onClick={toggleMenu}
                className={`py-3 text-lg hover:underline underline-offset-8 ${isDark
                  ? isColorTheoryActive ? "text-white underline font-bold" : "text-[#93C5FD] hover:text-[#93C5FD]"
                  : isColorTheoryActive ? "text-[#185693] underline font-bold" : "text-[#111612] hover:text-[#B88E6A]"
                  }`}
              >
                Color Lab
              </Link> */}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
