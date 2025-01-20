/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#13121A", //black
          100: "#2c2f36 ", //gray
        },
        secondary: {
          50: "#F9FAFB",
        },
      },
    },
  },
  plugins: [],
};
