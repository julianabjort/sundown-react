/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BA2329",
        secondary: "#007DDB",
        light: "#F6CBCB",
      },
      fontFamily: {
        "helvetica-neue": ["helvetica-neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
