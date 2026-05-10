/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          2: '#111118',
          3: '#16161f',
        },
        surface: {
          DEFAULT: '#1c1c28',
          2: '#22223a',
        },
        gemini: {
          DEFAULT: '#4285f4',
          2: '#669df6',
          3: '#93bbff',
        },
        accent: {
          DEFAULT: '#7c6ff7',
          2: '#a78bfa',
          3: '#c4b5fd',
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
        tagIn: 'tagIn 0.2s ease',
        toastIn: 'toastIn 0.3s ease',
      },
      keyframes: {
        tagIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
