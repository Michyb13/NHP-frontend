import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navy: "#003366",
        yellow: "#FFD700",
      },
      boxShadow: {
        navy: "0 4px 6px -1px rgba(0, 0, 100, 0.1), 0 2px 4px -1px rgba(0, 0, 100, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
