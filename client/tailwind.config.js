/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{html,js}",
        "./src/components/**/*.{html,js}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'cabin': ['Cabin', 'sans-serif']
        },
        colors: {
          'first': '#2F184B',
          'second': '#F4EFFA',
          'third': '#532B88',
          'fourth': '#C8B1E4',
          'fifth': '#2F094A',
          'sixth': '#C8B1E4'
        },
      },
    },
    plugins: [],
  }