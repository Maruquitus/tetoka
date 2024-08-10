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
      animation: {
        "fade-in": "fade-in 0.5s",
        "fade-out": "fade-out 0.5s",
        "slide-in": "slide-in 0.5s",
        "slide-out": "slide-out 0.5s",
        flying: "wind 1.5s infinite 0s",
      },
      keyframes: {
        wind: {
          "0%": {
            transform: "rotate(1deg)",
          },
          "50%": {
            transform: "rotate(-1deg)",
          },
          "100%": {
            transform: "rotate(1deg)",
          },
        },
        "slide-in": {
          "0%": { transform: "translate(-100%, 0px)" },
          "100%": { transform: "translate(0%, 0px)" },
        },
        "slide-out": {
          "0%": { transform: "translate(0%, 0px)" },
          "100%": { transform: "translate(-100%, 0px)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      colors: {
        primary: "#009c97",
        "primary-dark": "#00736e",
        "background-dark": "#0D1414",
        foreground: "#e5e7eb",
        "foreground-dark": "#163030",
        dark: "#1f2937",
        light: "#e5e7eb",
      },
    },
    fontWeight: {},
    fontFamily: {
      medium: "Lemonmilk-Medium",
      bold: "Lemonmilk-Bold",
    },
  },
};
