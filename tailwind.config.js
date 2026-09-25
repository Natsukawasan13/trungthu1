/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        festive: ['Cinzel Decorative', 'serif'],
      },
      colors: {
        midautumn: {
          red: '#991b1b',
          gold: '#fbbf24',
          night: '#050816',
          amber: '#f59e0b',
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'water-wave': 'waterWave 8s ease-in-out infinite alternate',
        'flame': 'flameFlicker 1.2s ease-in-out infinite alternate',
        'point': 'pointingHand 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 35px rgba(245, 158, 11, 0.95))' },
        },
        waterWave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-20px)' },
        },
        flameFlicker: {
          '0%': { transform: 'scale(1) rotate(-2deg)', opacity: '0.85' },
          '50%': { transform: 'scale(1.15, 1.25) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(0.95, 1.1) rotate(-1deg)', opacity: '0.9' },
        },
        pointingHand: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
