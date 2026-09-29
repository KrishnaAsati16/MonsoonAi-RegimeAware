/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F5F3',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#FAFAF8',
          card: '#FFFFFF',
          dark: '#18191B',
          'dark-subtle': '#222326'
        },
        border: {
          light: '#E7E7E3',
          DEFAULT: '#E7E7E3',
          dark: '#2A2B2E',
        },
        primary: {
          text: '#171717',
          muted: '#737373',
          subtle: '#A3A3A3',
        },
        accent: {
          lime: '#B8D957',
          'lime-soft': '#F4F9E4',
          'lime-border': '#D8EAA2',
          blue: '#75B8F5',
          'blue-soft': '#EBF4FE',
          cyan: '#70CBD5',
          'cyan-soft': '#E6F8FA',
          yellow: '#F4D35E',
          'yellow-soft': '#FEF9E6',
          orange: '#F4B860',
          'orange-soft': '#FEF4E8',
          red: '#E98276',
          'red-soft': '#FDECE9',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'float': '0 10px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      }
    },
  },
  plugins: [],
}
