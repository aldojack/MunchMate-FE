
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'form': 'max-content repeat(1, minmax(440px, max-content))'
      }
    },
  },
  plugins: [],
}