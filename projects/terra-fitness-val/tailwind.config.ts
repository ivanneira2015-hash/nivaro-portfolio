import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0c",
        "bg-elevated": "#141414",
        "bg-card": "rgba(255,255,255,0.03)",
        surface: "#1a1a1a",
        "surface-hover": "#222222",
        primary: "#c4a35a",
        "primary-light": "#d4b76a",
        "primary-dim": "rgba(196,163,90,0.12)",
        accent: "#8b9a6d",
        "accent-light": "#a3b585",
        "accent-dim": "rgba(139,154,109,0.12)",
        "text-main": "#f5f5f5",
        "text-secondary": "#a0a0a0",
        "text-muted": "#666666",
        border: "rgba(255,255,255,0.06)",
        "border-hover": "rgba(196,163,90,0.2)",
        success: "#7c9a6d",
        danger: "#c45a5a",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0,0,0,0.3)",
        md: "0 8px 32px rgba(0,0,0,0.4)",
        lg: "0 24px 64px rgba(0,0,0,0.5)",
        glow: "0 0 40px rgba(196,163,90,0.15)",
      },
    },
  },
  plugins: [],
}

export default config