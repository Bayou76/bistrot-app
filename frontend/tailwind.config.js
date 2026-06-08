/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        b: {
          dark: '#1B4332',
          mid: '#2D6A4F',
          light: '#40916C',
          gold: '#FFB703',
          yellow: '#FFD60A',
        }
      }
    },
  },
  plugins: [],
}