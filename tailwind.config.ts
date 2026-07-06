import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0f7b3c", light: "#e8f5ec", dark: "#0a5c2b" },
        accent: "#d21034",
        bg: "#f7f9f8",
      },
      fontFamily: { sans: ["Inter", "Tajawal", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
