const defaultSansFonts = [
  "-apple-system",
  "BlinkMacSystemFont",
  "'Segoe UI'",
  "Helvetica",
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Zen Kaku Gothic New", defaultSansFonts],
      },
    },
  },
  plugins: [],
};
