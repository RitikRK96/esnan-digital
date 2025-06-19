/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fef7ed',
          100: '#fdecd4',
          200: '#fad5a8',
          300: '#f6b771',
          400: '#f19638',
          500: '#ed7c14',
          600: '#de620a',
          700: '#b8480b',
          800: '#933b10',
          900: '#773110',
        },
        spiritual: {
          blue: '#87CEEB',
          gold: '#FFD700',
          orange: '#FF8C00',
          cream: '#F5F5DC',
        }
      },
      fontFamily: {
        'serif': ['Noto Serif', 'serif'],
        'decorative': ['Tangerine', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};