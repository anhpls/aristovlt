import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        bropella: ["Bropella", "sans-serif"],
        dunceItalic: ["Dunce Cap Italic", "serif"],
        dunceRegular: ["Dunce Cap Regular", "serif"],
        italiano: ["Italiano", "cursive"],
        junebug: ["Junebug", "sans-serif"],
        milkyway: ["Milkyway", "sans-serif"],
        monteCarlo: ["Monte Carlo", "cursive"],
        silverGarden: ["Silver Garden", "serif"],
        silverGardenBold: ["Silver Garden Bold", "serif"],
        silverGardenItalic: ["Silver Garden Italic", "serif"],
        silverGardenBoldItalic: ["Silver Garden Bold Italic", "serif"],
      },
      width: {
        "88": "23rem",
        "110": "35rem",
        "128": "40rem",
        "130": "50rem",
      },
      height: {
        "88": "23rem",
        "110": "35rem",
        "128": "40rem",
        "130": "50rem",
        "150": "80rem",
        "180": "80em",
      },
      zIndex: {
        "25": "25",
        "35": "35",
        "45": "45",
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
} satisfies Config;
