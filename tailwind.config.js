/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4A90E2',
        'brand-secondary': '#50C878',
        'blockchain-blue': '#0052FF'
      }
    }
  },
  plugins: [],
}
