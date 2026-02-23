/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],     
        heading: ['Inter', 'system-ui', 'sans-serif'],  
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      colors: {
        primary: {
          500: '#10B981',   
          600: '#059669',  
          700: '#047857',   
        },
      },
    },
  },
  plugins: [],
}