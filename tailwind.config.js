const { Container } = require("postcss");

module.exports = {
  content: ["/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "meteo-primary": "#027034",
        "meteo-secondary": "#292524",
      },
    },
    fontFamily: {
      Lato: ["Lato", "Verdana"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
    sm: "640px",
    md: "768px",
    // lg: "1024px",
    // xl: "1280px",
    // "2xl": "1536px",
    },
  },
    plugins: [],
};
