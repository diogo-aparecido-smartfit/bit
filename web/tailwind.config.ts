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
        seccondaryText: "#A3A3A3",
        primaryPurple: "#5d3fd3",
        elementsBg: "#1C1C1C",
      },
    },
  },
  plugins: [],
};
export default config;
