/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "violet":"#A64AC9",
        "blue":"#58FFE1",
        'orange':'#F4B521'
      },
      fontFamily:{
        "pluto":"Pluto",
        "museo":"MuseoModerno"
      },
      animation:{
        'navbarOpen':'navbarOpen 1000ms ease',
        'spin-atom':'spinningAtom 10s linear infinite',
        'banner':'banner 3s linear infinite'
      },
      keyframes:{
        navbarOpen:{
          '0%':{
              opacity: '0',
              transform: 'translateY(-20px)',
          },
          '100%':{
              opacity: '1',
              transform: 'translateY(0)',
          }
        },
        spinningAtom:{
          '0%':{
            transform: 'rotate(0deg)',
          },
          '100%':{
            transform: 'rotate(360deg)',
          }
        },
        banner:{
          '0%':{
            transform: 'translateX(0)',
          },
          '100%':{
            transform: 'translateX(300px)',
          }
        }
      }
    },
  },
  plugins: [],
}