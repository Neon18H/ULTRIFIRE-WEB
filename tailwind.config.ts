import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#060810',
        deep: '#0A0E16',
        panel: '#0D1420',
        line: '#1A2333',
        bluefire: '#1A6FFF',
        cyanfire: '#00B4FF',
        orangefire: '#FF5A1F',
        textfire: '#F0F4FA',
        mutedfire: '#8B9CB3'
      },
      fontFamily: {
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 24px 90px rgba(0, 0, 0, 0.36)',
        border: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
      },
    }
  },
  plugins: []
};

export default config;
