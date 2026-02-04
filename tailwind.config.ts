import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        neon: {
          blue: '#00f0ff',
          pink: '#ff006e',
          purple: '#8b5cf6',
          green: '#00ff88',
          orange: '#ff6b35',
          yellow: '#ffd60a',
        },
        fest: {
          primary: '#ff006e',
          secondary: '#00f0ff',
          dark: '#0a0e27',
          darker: '#050816',
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wave': 'wave 4s linear infinite',
        'fire': 'fire 1s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'neon-flicker': 'neon-flicker 1.5s infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            transform: 'scale(1)',
          },
          '50%': { 
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 50px currentColor',
            transform: 'scale(1.02)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'wave': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '100%': { transform: 'translateX(-50%) translateY(0)' },
        },
        'fire': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
          '50%': { 
            opacity: '0.8',
            transform: 'translateY(-5px) scale(1.05)',
          },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
