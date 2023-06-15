/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      backgroundColor:{
        'grey-default':'#f2f2f4',
      },
      textColor:{
        'black-default':'#212121',
      }
    },
  },
  plugins: [],
}

