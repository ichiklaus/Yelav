/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'mate-gray': '#333333',
        'y-orange': '#FF7F01',
        'bone': '#D7EADF',
        'light-bone': '#aeb5b1',
        'c-blue': '#3776A2',
        'c-sky': '#3776A2',
        'c-beige': '#D3CDB3',
        'body-black': '#121212',
        'light-black': '#989898',
        'light-lilac': '#CDB4F9',
        'accent': '#B488FF',
        'glass': '#9696961a',
      },
      fontSize: {
        'base': '16px'
      },
      height: {
        'lvh': '100vh'
      },
    },
  },
  plugins: [],
}
