import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background1: "var(--background-1)",
        background2: "var(--background-2)",
        background3: "var(--background-3)",
        background4: "var(--background-4)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
        accent: "var(--accent)",
        logo1: "var(--logo-1)",
        logo2: "var(--logo-2)",
        highlighted1: "var(--highlighted-1)",
        highlighted2: "var(--highlighted-2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
