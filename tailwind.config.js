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
    colors: {
      'Apptheme': '#9c1dac',
      'black': '#00000',
      'white': '#ffffff',
      'slate': '#f3f4f6',
      'slate-50': '#F8FAFC',
      'slate-100': '#F1F5F9',
      'slate-200': '#E2E8F0',
      'slate-300': '#CBD5E1',
      'slate-400': '#94A3B8',
      'slate-500': '#64748B',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#595959',
      'gray-light': '#d3dce6',
      'gray-800': '#1F2937',
      'gray-200': '#E5E7EB',
      'gray-300': '#D1D5DB',
      'gray-400': '#9CA3AF',
      'gray-500': '#6B7280',
      'gray-600': '#4B5563',
      'gray-700': '#374151',
      'gray-800': '#1F2937',
      'gray-900': '#111827',
    },
   
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
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
  plugins: [require("tailwindcss-animate"),nextui()],
}