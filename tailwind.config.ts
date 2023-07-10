import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        podmod: '#00A6FB',
        'podmod-dark': '#0582CA',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
