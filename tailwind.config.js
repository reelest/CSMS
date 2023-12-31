/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{components,pages,utils,shared}/**/*.{js,html,jsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#170dd8",
        hoverPrimary: "#deddfd",
        primaryDark: "#070441",
        secondary: "#ff8200",
        bg: "#f9f9fc",
        error: "#d32f2f",
        // primaryLight: MuiTheme.palette.primary.light,
        // error: MuiTheme.palette.error.main,
        // disabled: MuiTheme.palette.text.disabled,
        disabledOnPrimaryDark: "#aeafb5",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};
