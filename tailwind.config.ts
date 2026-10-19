import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#081E36",
        foreground: "#F0F9FF",
        rawaa: {
          bg: "#081E36",           // Sky Navy / Deep Celestial Blue
          card: "#0C2E52",         // Rich Sky-Blue Card Surface
          cardBorder: "#1E4A78",   // Sky Border
          cardHover: "#103C6B",
          primary: "#38BDF8",      // Celestial Sky Blue
          primaryGlow: "rgba(56, 189, 248, 0.35)",
          secondary: "#0284C7",    // Deep Sky Blue
          accent: "#34D399",       // Tech Mint Green
          accentGlow: "rgba(52, 211, 153, 0.25)",
          purple: "#818CF8",       // Indigo / Cyber Violet
          navy: "#0A2544",
          muted: "#BAE6FD",
          darker: "#041222",
        },
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px -4px rgba(56, 189, 248, 0.45)",
        glowGreen: "0 0 30px -4px rgba(52, 211, 153, 0.4)",
        glowPurple: "0 0 30px -4px rgba(129, 140, 248, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
