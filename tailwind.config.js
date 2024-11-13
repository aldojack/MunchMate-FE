/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('./src/assets/images/timelapsed-burger.jpg')"
      },
      gridTemplateColumns: {
        'form': 'max-content repeat(1, minmax(0, max-content))'
      }
    },
  },
  plugins: [],
}