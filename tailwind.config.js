/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Maybe add semantic names like card, cta and group variables for themes
        text: "rgba(var(--text))",
        background: "rgba(var(--background))",
        primary: "rgba(var(--primary))",
        secondary: "#ff4f1a",
        accent: "#55a2a5",
      },
    },
  },
  plugins: [],
};
