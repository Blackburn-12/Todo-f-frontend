/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       "main-bg": "#0D0D0D",
       "button-bg": "#88AB33",
       "button-bg-hover": "#98bf37",
       "Dark":"#0F0F0F",

      },
      fontFamily:{
        "Roboto": ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}