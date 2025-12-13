/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f4f4f5',
        primary: '#111827',
        accent: '#6366f1',
        muted: '#9ca3af'
      },
      boxShadow: {
        card: '0 16px 40px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
