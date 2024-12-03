/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlueStart: '#0066FF', // Custom color for the start of the gradient
        customBlueEnd: '#0E295F',    // Custom color for the end of the gradient
        customBlue: '#154097',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'], // Add the Raleway font
      },
    },
  },
  plugins: [],
}


