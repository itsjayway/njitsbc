/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
  plugins: [],
};
