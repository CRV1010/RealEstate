/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'cyan': colors.cyan,
        'teal': colors.teal
      }
    },
  },
  plugins: [],
}

