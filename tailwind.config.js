/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        card: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        'primary-dark': '#1f2937',
        'secondary-dark': '#111827',
        'accent-dark': '#374151',
        'primary-light': '#f3f4f6',
        'secondary-light': '#9ca3af',
        'accent-light': '#60a5fa',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}; 