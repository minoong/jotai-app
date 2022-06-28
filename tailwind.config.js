/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./src/**/*.{js,jsx,ts,tsx}'],
 theme: {
  extend: {
   keyframes: {
    'toast-in-bottom': {
     from: {
      transform: 'scale(0)',
     },
     to: {
      transform: 'scale(1)',
     },
    },
    'test-hide': {
     from: {
      transform: 'scale(1)',
     },
     to: {
      transform: 'scale(0)',
      display: 'none',
     },
    },
   },
   animation: {
    't-in-bottom': 'toast-in-bottom .3s',
    't-in-hide': 'test-hide .3s',
   },
   scale: {
    102: '1.02',
   },

   truncate: {
    lines: {
     1: '1',
     2: '2',
     3: '3',
     5: '5',
     8: '8',
    },
   },
  },
 },
 darkMode: 'media', // class
 plugins: [require('@tailwindcss/forms'), require('tailwindcss/colors')],
}
