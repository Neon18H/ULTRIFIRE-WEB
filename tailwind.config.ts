import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#02040A',
        deep: '#060C18',
        panel: '#0A1220',
        bluefire: '#1A6FFF',
        cyanfire: '#00B4FF',
        orangefire: '#FF6B00',
        redfire: '#FF3B1D',
        greenfire: '#00C471',
        violetfire: '#8B5CF6',
        textfire: '#DCE8FF',
        mutedfire: '#4A6080'
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 180, 255, 0.22)',
        'glow-strong': '0 0 70px rgba(26, 111, 255, 0.35)',
        fire: '0 0 44px rgba(255, 107, 0, 0.28)',
        'fire-strong': '0 0 80px rgba(255, 59, 29, 0.36)'
      },
      backgroundImage: {
        'radial-cyber': 'radial-gradient(circle at 50% 50%, rgba(0,180,255,0.18), transparent 36%)',
        'fire-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF3B1D 52%, #FFB000 100%)',
        'tech-gradient': 'linear-gradient(135deg, #1A6FFF 0%, #00B4FF 100%)'
      },
      keyframes: {
        gridMove: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '72px 72px, 72px 72px' }
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(24px, -22px, 0) scale(1.08)', opacity: '0.85' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.85' }
        },
        ember: {
          '0%': { transform: 'translate3d(0, 24px, 0) scale(0.8)', opacity: '0' },
          '18%': { opacity: '0.8' },
          '100%': { transform: 'translate3d(34px, -110px, 0) scale(0.2)', opacity: '0' }
        }
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        aurora: 'aurora 10s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
        'pulse-line': 'pulseLine 3.4s ease-in-out infinite',
        ember: 'ember 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
