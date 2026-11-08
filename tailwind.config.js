/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1700px",
      },
    },
    extend: {
      colors: {
        'Apptheme': '#9c1dac',
        'popover': {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        'muted': {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        'accent': {
          DEFAULT: '#f3f4f6',
          foreground: '#111827',
        },
        'border': '#e5e7eb',
        'input': '#e5e7eb',
        'ring': '#9c1dac',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
}
