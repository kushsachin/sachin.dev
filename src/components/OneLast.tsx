import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import DownloadButton from "./DownloadButton";
import { toast } from "react-toastify";

function OneLast() {
  const { isDark } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "sending") return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Name Validation
    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    if (trimmedName.length > 60) {
      toast.error("Name is too long.");
      return;
    }

    // Email Validation
    if (!trimmedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Message Validation
    if (!trimmedMessage) {
      toast.error("Please enter your message.");
      return;
    }

    if (trimmedMessage.length < 10) {
      toast.error("Message should be at least 10 characters.");
      return;
    }

    if (trimmedMessage.length > 2000) {
      toast.error("Message is too long.");
      return;
    }

    try {
      setStatus("sending");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      toast.success("Message sent successfully!");

      setName("");
      setEmail("");
      setMessage("");

      setStatus("success");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className={`relative overflow-hidden py-16 ${isDark
        ? "bg-gradient-to-br from-[#111612] to-[#1A1A1A]"
        : "bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]"
        }`}
    >
      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            variants={containerVariants}
            className="space-y-8 text-center md:text-left flex flex-col items-center"
          >
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className={`inline-flex items-center gap-3 px-4 py-2 bg-[#93C5FD]/20 rounded-full border ${isDark ? "border-[#93C5FD]/80" : "border-[#111612]/80"
                } mb-4`}
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: "-100px" }}
                transition={{ delay: 0.4, type: "spring" }}
                className="w-3 h-3 rounded-full bg-[#6cdb28] animate-pulse"
              />
              <span
                className={`text-sm font-medium ${isDark ? "text-[#93C5FD]" : "text-[#111612]"
                  }`}
              >
                Open for new projects and opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? "text-[#93C5FD]" : "text-[#185693]"
                  } mb-4 text-center`}
              >
                <span className="block">{`Let's Create Something`}</span>
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  whileInView={{ backgroundPosition: "100% 50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  className={`bg-gradient-to-r 
                  ${isDark
                      ? "from-[#B88E6A] to-[#93C5FD]"
                      : "from-[#B88E6A] to-[#185693]/90"
                    }
                  bg-clip-text text-transparent`}
                >
                  Remarkable Together
                </motion.span>
              </h2>
            </motion.div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 text-left items-start">
              {/* Left Column: Quick Contact & Details */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className={`text-2xl font-bold ${isDark ? "text-[#93C5FD]" : "text-[#185693]"}`}>
                  Get In Touch
                </h3>
                <p className={`text-base leading-relaxed ${isDark ? "text-[#93C5FD]/80" : "text-[#111612]/80"}`}>
                  I specialize in crafting premium web experiences for businesses and startups. Whether you need a skilled developer for your team, have an idea for a project, or just want to say hi — feel free to drop a message!
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4 group">
                    <span className={`p-3 rounded-lg flex items-center justify-center transition-all ${isDark ? "bg-[#93C5FD]/10 text-[#93C5FD]" : "bg-[#185693]/10 text-[#185693]"}`}>
                      <FiMail size={20} />
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-xs ${isDark ? "text-[#93C5FD]/50" : "text-[#111612]/50"}`}>Email</span>
                      <a href="mailto:usachin017@gmail.com" className={`hover:underline font-medium ${isDark ? "text-[#93C5FD] hover:text-[#93C5FD]" : "text-[#185693] hover:text-[#B88E6A]"}`}>
                        usachin017@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <span className={`p-3 rounded-lg flex items-center justify-center transition-all ${isDark ? "bg-[#93C5FD]/10 text-[#93C5FD]" : "bg-[#185693]/10 text-[#185693]"}`}>
                      <FiMapPin size={20} />
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-xs ${isDark ? "text-[#93C5FD]/50" : "text-[#111612]/50"}`}>Location</span>
                      <span className={`font-medium ${isDark ? "text-[#ffffff]/80" : "text-[#111612]/80"}`}>
                        Lucknow, Uttar Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 pt-4">
                  <DownloadButton
                    fileUrl="/assets/Sachin_Frontend_Engineer_Resume.pdf"
                    fileName="Sachin_Frontend_Engineer_Resume.pdf"
                    buttonText="Download Resume"
                  />
                  <a
                    href="https://www.linkedin.com/in/kushsachin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 transition-all ${isDark
                      ? "border-[#93C5FD] text-[#93C5FD] hover:bg-[#93C5FD]/10"
                      : "border-[#185693] text-[#185693] hover:bg-[#185693]/10"
                      } font-medium`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Connect on LinkedIn
                      <FiLinkedin size={18} />
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Contact Form Card */}
              <motion.div
                variants={itemVariants}
                className={`p-6 sm:p-8 rounded-xl border-2 backdrop-blur-sm shadow-xl ${isDark
                  ? "bg-[#111612]/40 border-[#93C5FD]/20"
                  : "bg-white/40 border-[#111612]/20"
                  }`}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={`block mb-1.5 text-sm font-medium ${isDark ? "text-[#93C5FD]" : "text-[#111612]"}`}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm focus:outline-none transition-all ${isDark
                        ? "border-[#93C5FD]/30 text-white focus:border-[#93C5FD] focus:ring-1 focus:ring-[#93C5FD]"
                        : "border-[#111612]/30 text-[#111612] focus:border-[#185693] focus:ring-1 focus:ring-[#185693]"
                        }`}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block mb-1.5 text-sm font-medium ${isDark ? "text-[#93C5FD]" : "text-[#111612]"}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm focus:outline-none transition-all ${isDark
                        ? "border-[#93C5FD]/30 text-white focus:border-[#93C5FD] focus:ring-1 focus:ring-[#93C5FD]"
                        : "border-[#111612]/30 text-[#111612] focus:border-[#185693] focus:ring-1 focus:ring-[#185693]"
                        }`}
                      placeholder="Your Email Address"
                      required
                    />
                  </div>

                  <div>
                    <label className={`block mb-1.5 text-sm font-medium ${isDark ? "text-[#93C5FD]" : "text-[#111612]"}`}>
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-sm h-32 resize-none focus:outline-none transition-all ${isDark
                        ? "border-[#93C5FD]/30 text-white focus:border-[#93C5FD] focus:ring-1 focus:ring-[#93C5FD]"
                        : "border-[#111612]/30 text-[#111612] focus:border-[#185693] focus:ring-1 focus:ring-[#185693]"
                        }`}
                      placeholder="How can I help you?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer ${isDark
                      ? "bg-[#93C5FD] text-[#111612] hover:bg-[#93C5FD]/90 disabled:bg-[#93C5FD]/50"
                      : "bg-[#185693] text-white hover:bg-[#185693]/90 disabled:bg-[#185693]/50"
                      }`}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px] ${isDark ? "bg-[#93C5FD]/30" : "bg-[#185693]/30"
            }`}
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

        {/* Second orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          className={`absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-[90px] ${isDark ? "bg-[#93C5FD]/20" : "bg-[#B88E6A]/30"
            }`}
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

        {/* Floating background particles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0"
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${isDark ? "bg-[#93C5FD]/40" : "bg-[#185693]/40"
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
