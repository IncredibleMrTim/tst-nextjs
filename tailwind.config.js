export default {
  content: ['./client/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      keyframes: {
        phone: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(10deg)' },
          '20%': { transform: 'rotate(20deg)' },
          '30%': { transform: 'rotate(30deg)' },
          '40%': { transform: 'rotate(40deg)' },
          '50%': { transform: 'rotate(50deg)' },
        },
      },
      animation: {
        phoneRotate: 'phone 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};