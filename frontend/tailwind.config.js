
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
        border: 'var(--color-border)', 
        input: 'var(--color-input)', 
        ring: 'var(--color-ring)', 
        background: 'var(--color-background)', 
        foreground: 'var(--color-foreground)', 
        primary: {
          DEFAULT: 'var(--color-primary)', 
          foreground: 'var(--color-primary-foreground)', 
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', 
          foreground: 'var(--color-secondary-foreground)', 
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', 
          foreground: 'var(--color-destructive-foreground)', 
        },
        muted: {
          DEFAULT: 'var(--color-muted)', 
          foreground: 'var(--color-muted-foreground)', 
        },
        accent: {
          DEFAULT: 'var(--color-accent)', 
          foreground: 'var(--color-accent-foreground)', 
        },
        popover: {
          DEFAULT: 'var(--color-popover)', 
          foreground: 'var(--color-popover-foreground)', 
        },
        card: {
          DEFAULT: 'var(--color-card)', 
          foreground: 'var(--color-card-foreground)', 
        },
        success: {
          DEFAULT: 'var(--color-success)', 
          foreground: 'var(--color-success-foreground)', 
        },
        warning: {
          DEFAULT: 'var(--color-warning)', 
          foreground: 'var(--color-warning-foreground)', 
        },
        error: {
          DEFAULT: 'var(--color-error)', 
          foreground: 'var(--color-error-foreground)', 
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