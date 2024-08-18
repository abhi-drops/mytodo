/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': "#142850",
      "primary-dull": "#08517F",
      'secondary': '#FF204E',
      'light': '#EBEBEB',
      'light-primary': '#265C91',
      'white': "white",
      'black': "black",
      'transparent': 'transparent'
    }
  },
  plugins: [],
}
