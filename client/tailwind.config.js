/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009c97",
        "primary-dark": "#00736e",
        "background-dark": "#0D1414",
        foreground: "#e5e7eb",
        "foreground-dark": "#163030",
      },
    },
    fontWeight: {},
    fontFamily: {
      medium: "Lemonmilk-Medium",
      bold: "Lemonmilk-Bold",
    },
  },
  plugins: [],
};
