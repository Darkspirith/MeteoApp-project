module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "meteo-primary": "#27272a",
        "meteo-secondary": "#10b981",
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
      lg: "1024px",
    },
  },
  plugins: [],
};
