export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Inter"', 'sans-serif']
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
