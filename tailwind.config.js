module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all the paths to your files
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s forwards',
        fadeInLeft: 'fadeInLeft 2s forwards',
        fadeInRight: 'fadeInRight 2s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      fontSize: {
        '10xl': '9rem',
        '11xl': '10rem',
      },
      letterSpacing: {
        '40px': '40px', 
      },
    },
  },
  plugins: [],
}
