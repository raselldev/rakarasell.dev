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
        primary: "#334257",
        secondary: "#548CA8",
        white: "#EEEEEE",
        accent: "#FF5733",
      },
    },
  },
  plugins: [],
};
export default config;
