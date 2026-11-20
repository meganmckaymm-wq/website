/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#bad6fd', // light blue
        wine: '#835e48', // dark burgundy (strongest brand colour)
        blush: '#f5bad5', // soft pink
        butter: '#f7e594', // warm yellow
        paper: '#fff9f5', // warm off-white ground
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 40px -18px rgba(131, 94, 72, 0.35)',
        pop: '5px 5px 0 0 #835e48',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--r, 0deg))' },
        },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        spinslow: 'spinslow 22s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
