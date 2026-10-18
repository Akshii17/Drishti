/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#183A46',
        teal: { 50: '#edf8f7', 100: '#d4eeeb', 500: '#2f8d8a', 600: '#247875', 700: '#1d6261' },
        cream: '#f7f5ef',
        sand: '#e9e2d4',
      },
      boxShadow: { soft: '0 8px 28px rgba(24, 58, 70, 0.06)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}