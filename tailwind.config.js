/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'oso-pink': '#FF466E',
        'oso-orange': '#FF963C',
        'oso-light-orange': '#FFC864',
        'oso-red-orange': '#FF6450',
        'oso-black': '#1A1A1A',
        'oso-gray': '#6B7280',
        'oso-light-gray': '#F8FAFC',
        'oso-dark-gray': '#374151',
      },
      fontFamily: {
        sans: ['Montserrat Arabic', 'Inter', 'sans-serif'],
        'montserrat-arabic': ['Montserrat Arabic', 'sans-serif'],
        'arabic': ['Montserrat Arabic', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

