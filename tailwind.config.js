/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        body:['Nunito','san-serif']
      }
    },
    
  },
  variants: {
    textColor: ({ after }) => after(['invalid']),
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
}

