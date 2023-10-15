/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/assets/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/views/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgPrimary: "#2CA4A5",
        bgPrimaryActive: "#28999A",
        btnVerify : "#6ee7b7",
        btnHverify : "#34d399"
      },
      screens:{
        'xs' : '372px'
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
};