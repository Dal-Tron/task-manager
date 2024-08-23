import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        slideOutLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        pulseWiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg)',
            opacity: '1',
          },
          '50%': {
            transform: 'rotate(1deg)',
            opacity: '0.5',
          },
        },
        colorPulse: {
          '0%, 12.5%': { color: '#3b82f6', borderColor: '#3b82f6' },
          '12.5%, 25%': { color: '#f87171', borderColor: '#f87171' },
          '25%, 37.5%': { color: '#34d399', borderColor: '#34d399' },
          '37.5%, 50%': { color: '#fbbf24', borderColor: '#fbbf24' },
          '50%, 62.5%': { color: '#8b5cf6', borderColor: '#8b5cf6' },
          '62.5%, 75%': { color: '#ec4899', borderColor: '#ec4899' },
          '75%, 87.5%': { color: '#06b6d4', borderColor: '#06b6d4' },
          '87.5%, 100%': { color: '#f97316', borderColor: '#f97316' },
        },
      },
      animation: {
        slideOutLeft: 'slideOutLeft 0.5s forwards',
        slideInRight: 'slideInRight 0.5s forwards',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        pulseWiggle: 'pulseWiggle 1s ease-in-out infinite',
        colorPulse: 'colorPulse 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
