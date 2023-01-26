/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-brand': '#202124',
        'brand-grey': '#34363c',
        'brand-light-grey': '#EAEAEA',
        'primary-color': '#b154eb',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      keyframes: {
        bgScroll: {
          '0%, 100%': { backgroundPosition: '0% 50%;' },
          '50%': { backgroundPosition: '100% 50%;' }
        },
        arrowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      },
      animation: {
        'bg-scroll': 'bgScroll 5s linear infinite',
        'arrow-bounce': 'arrowBounce 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
