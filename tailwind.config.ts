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
        background: "#080C14",
        foreground: "#F8FAFC",
        rawaa: {
          bg: "#070B12",
          card: "#0E1524",
          cardBorder: "#1E293B",
          cardHover: "#131C31",
          primary: "#06B6D4",      // Cyan
          primaryGlow: "rgba(6, 182, 212, 0.25)",
          secondary: "#38BDF8",    // Sky blue
          accent: "#10B981",       // Tech Green
          accentGlow: "rgba(16, 185, 129, 0.25)",
          purple: "#8B5CF6",       // Cyber purple
          navy: "#0F172A",
          muted: "#94A3B8",
          darker: "#030712",
        },
      },
      fontFamily: {
        sans: ["Cairo", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(6, 182, 212, 0.3)",
        glowGreen: "0 0 25px -5px rgba(16, 185, 129, 0.3)",
        glowPurple: "0 0 25px -5px rgba(139, 92, 246, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
