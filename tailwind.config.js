// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          1: '#0C0052'
        },
        'neutral': {
          3: '#0000004D',
          5: '#0000000D'
        }
      }
    },
  },
  plugins: [],
};
