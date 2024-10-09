/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        full: '0px 0px 15px 5px rgba(0, 0, 0, 0.25)', // Sesuaikan dengan ukuran shadow yang diinginkan
      },
    },
  },
  plugins: [],
};
