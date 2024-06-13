/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Custom Font"',"Serif", "sans-serif"],
      },
      colors:{
        "dark_color": "#2d2d2d",
        "main_color": "#E8F9FC",
        "light-white": "rgba(255,255,255,0.17)",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

