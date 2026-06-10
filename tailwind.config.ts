import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#1a1410",
          surface: "#2a2418",
          elevated: "#332c1e",
        },
        border: {
          DEFAULT: "#3a3020",
          focus: "#5a4a30",
        },
        gold: {
          DEFAULT: "#c9a84c",
          muted: "#a89060",
          faint: "#7a6a50",
        },
        text: {
          primary: "#e8dcc8",
          muted: "#a89060",
          faint: "#6a5a40",
        },
        correct: {
          bg: "#1a3020",
          border: "#3a6040",
          text: "#7aaa7a",
        },
        wrong: {
          bg: "#301818",
          border: "#603030",
          text: "#aa7a7a",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default config
