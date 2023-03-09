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
      keyframes: {
        lefttoright: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        toptobottom: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        bottomtotop: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        opensubmenu: {
          "0%": { height: "0%" },
          "20%": { height: "20%" },
          "40%": { height: "40%" },
          "60%": { height: "60%" },
          "80%": { height: "80%" },
          "100%": { height: "100%" },
        },
      },
      animation: {
        "left-to-right": "lefttoright 200ms ease-in-out",
        "top-to-bottom": "toptobottom 200ms ease-in-out",
        "bottom-to-top": "bottomtotop 200ms ease-in-out",
        "open-submenu": "opensubmenu 200ms ease",
      },
    },
  },
  plugins: [],
};
