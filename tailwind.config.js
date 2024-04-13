/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,ejs}",
    "./server/views/*.{js,ts,jsx,tsx,ejs}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  "tailwindCSS.includeLanguages": { 
    "plaintext": "javascript" 
  }
}

