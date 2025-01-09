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
      },
    },
  },
  plugins: [],
} satisfies Config;
