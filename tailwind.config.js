/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./{components,pages,utils}/**/*.{js,html,jsx}"],
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
        DEFAULT: "12px",
      },
    },
  },
  plugins: [],
};

module.exports = tailwindConfig;
