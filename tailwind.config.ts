import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        podmod: '#41B0F6',
        'podmod-dark': '#348CC4',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
