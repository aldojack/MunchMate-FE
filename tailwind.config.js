/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('./public/images/timelapsed-burger.jpg')"
      },
      gridTemplateColumns: {
        'form': 'max-content repeat(1, minmax(440px, max-content))'
      }
    },
  },
  plugins: [],
}