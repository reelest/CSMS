import "./globals.css";
import "@fontsource/inter";
import "@fontsource/poppins";
import { ThemeProvider } from "@mui/material/styles";
import MuiTheme from "@/components/MuiTheme";
import { CssBaseline } from "@mui/material";
import "@/logic/app_config"; // It is essential that this comes we try to access any model
import { setAppLogo } from "@/shared/components/Sidebar";
import AppLogo from "@/components/AppLogo";
setAppLogo(
  <div className="w-full h-auto mb-12 mt-8">
    <AppLogo className="block w-32 h-auto mx-auto" />
  </div>
);
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
