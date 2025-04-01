// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "475px", // Custom extra small breakpoint
      sm: "640px", // Small
      md: "768px", // Medium
      lg: "1024px", // Large
      xl: "1280px", // Extra large
      "2xl": "1536px", // 2X large
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B88E6A",
          dark: "#D8FFC0",
        },
        secondary: {
          DEFAULT: "#B7C7F3",
          dark: "#2A271F",
        },
        accent: {
          DEFAULT: "#D8FFC0",
          dark: "#B88E6A",
        },
        text: {
          DEFAULT: "#B7C7F3",
          dark: "#2A271F",
        },
      },
    },
  },
};
