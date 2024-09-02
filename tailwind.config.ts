import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: {
          violet: "#635FC7",
          "light-violet": "#A8A4FF",
          dark: "#000112",
          "semi-dark": "#20212C",
        },
        secondary: {
          "dark-gray": "#2B2C37",
          "light-gray": "#3E3F4E",
          gray: "#828FA3",
          "light-blue": "#E4EBFA",
        },
        tetiary: {
          "white-space": "#F4F7FD",
          red: "#EA5555",
          "light-red": "#FF9898",
        },
      },
    },
  },
  plugins: [],
};
export default config;
