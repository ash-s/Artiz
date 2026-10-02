/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        japandi: {
          bg: "#FAF8F5",
          surface: "#F2EDE4",
          card: "#FFFFFF",
          border: "#EAE3D2",
          dark: "#2B231D",
          darkHover: "#40352D",
          charcoal: "#1F1B18",
          brass: "#B89467",
          brassHover: "#A38053",
          walnut: "#543D2B",
          sage: "#7D8B78",
          muted: "#73685E",
          subtle: "#8C827A",
        }
      },
      fontFamily: {
        display: ['"Italiana"', '"Prata"', 'Didot', '"Bodoni MT"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Prata"', '"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        luxury: "0.22em",
        editorial: "0.08em",
      }
    },
  },
  plugins: [],
};
