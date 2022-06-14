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
      backgroundImage: {
        'pattern': "url('/src/images/home/Hero/pattern.svg')"
      },
      colors: {
        primary: {
          50: '#fdf5f7',
          150: '#f9e5eb',
          100: '#fdf5f7',
          200: '#f1c6d2',
          300: '#eeb6c5',
          400: '#e696ac',
          500: '#de7693',
          600: '#de7693',
          700: '#d3476d',
          800: '#cf3761',
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
