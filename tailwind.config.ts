import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-color-primary": "var(--surface-color-primary)",
        "surface-color-secundary": "var(--surface-color-secondary)",
        "main-color": "var(--main-color)",
        "font-primary-color": "var(--font-primary-color)",
        "font-secondary-color": "var(--font-secondary-color)",
        "line-color": "var(--line-color)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
