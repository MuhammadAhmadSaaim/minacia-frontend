module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all the paths to your files
  ],
  theme: {
    extend: {
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
