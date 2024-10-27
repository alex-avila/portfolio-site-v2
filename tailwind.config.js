const colors = require("tailwindcss/colors");

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

// NOTE: original colors kept here for now for reference
// const colorsLight = {
//   white: "#fff", // bg
//   "gray-800": "#1f2937", // headings and stuff
//   "gray-600": "#485563", // main content
//   "gray-500": "#6b7280", // secondary content (inactive nav items, skill categories)
//   "gray-200": "#e5e7eb", // soft accent or whatever
// };
// const colorsDark = {
//   "neutral-900": "#171717", // bg
//   "neutral-200": "#e5e5e5", // headings and stuff
//   "neutral-400": "#a3a3a3", // main content
//   "neutral-500": "#737373", // secondary content (inactive nav items, skill categories)
//   "neutral-700": "#404040", // soft accent or whatever
// };

// notes about the color scheme of the design
// - it has a main background color either light or dark
// - it has 3 shades of content color
// - - one for headings and things to be highlighted (job titles, skills, icons)
// - - one for most of the text content bit darker than previous
// - - one for additional text that isn't super important or just categorizes stuff
// - it has a super soft, subtle color for mainly borders and decorative lines

const darkForest = {
  bg: "#171212",
  headings: "#1eb854",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Zen Kaku Gothic New", defaultSansFonts],
      },
      colors: {
        forest: {
          base: '#1a2b2d',
          content: '#b8c7ba',
          'content-quiet': '#94a29b',
          'content-loud': '#d9e2d2',
          'content-quiet-2': '#647c73',
          accent: '#e5b083'
        },
        garden: {
          base: '#f5efe9',
          content: '#5a5f56',
          'content-quiet': '#877e6e',
          'content-loud': '#4a5f53',
          'content-quiet-2': '#d9d1c9',
          accent: '#d97a50'
        },
      },
    },
  },
  plugins: [],
};
