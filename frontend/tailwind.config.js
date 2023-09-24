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
        'teal': colors.teal,
        'sellIcon': 'rgb(8, 245, 166)',
        'imgPropIcon': 'rgb(8, 245, 166)',
        'imgShadow': 'rgb(81, 210, 238)'
      }
    },
  },
  plugins: [],
}

