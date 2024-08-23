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
      },
      animation: {
        slideOutLeft: 'slideOutLeft 0.5s forwards',
        slideInRight: 'slideInRight 0.5s forwards',
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        pulseWiggle: 'pulseWiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
