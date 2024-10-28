import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8000b0",    // purple-500 color value
        secondary: "#0051bc",  // blue-500 color value
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-20": "rgba(238, 238, 238, 0.2)"
      },
    },
  },
  plugins: [],
};

export default config;