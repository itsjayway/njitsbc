/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        "njit-red": "#d22630",
        "njit-red-dark": "#82161c",
        "njit-navy": "#071d49",
        "njit-navy-dark": "#04112a",
        "njit-gray": "#c1c6c8",
        "njit-gray-dark": "#8a9093",
      },
      fontFamily: {
        brick: ["Brick", "sans-serif"],
      },
    },
  },
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    extract,
  },
  plugins: [fluid],
};
