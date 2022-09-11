const plugin = require("tailwindcss/plugin");

const Myclass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fbdaeb',
          200: '#f7b6d6',
          300: '#f491c2',
          400: '#f06dad',
          500: '#ec4899',
          600: '#bd3a7a',
          700: '#8e2b5c',
          800: '#5e1d3d',
          900: '#2f0e1f',
        },
        rest: '#ECE7E9',
        analogous: '#e6a896',
        secondary: '#424446'

      },
      fontFamily: {
        'body': ["Raleway"],
        'design': ["Sora"],
        'cursive': ["Pacifico"]
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

      },
      animation: {
        'wiggle': 'wiggle 300ms ease-in-out ',
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [Myclass],
}
