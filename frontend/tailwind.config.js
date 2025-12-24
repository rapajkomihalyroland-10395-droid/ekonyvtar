/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', /* gray-200 */
        input: 'var(--color-input)', /* gray-200 */
        ring: 'var(--color-ring)', /* blue-900 */
        background: 'var(--color-background)', /* stone-50 */
        foreground: 'var(--color-foreground)', /* gray-800 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* blue-900 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* slate-500 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 */
          foreground: 'var(--color-muted-foreground)', /* gray-500 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-500 */
          foreground: 'var(--color-accent-foreground)', /* gray-800 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)', /* gray-800 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)', /* gray-800 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)', /* gray-800 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Source Sans 3', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'overlay': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-in': 'slide-in 300ms ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}