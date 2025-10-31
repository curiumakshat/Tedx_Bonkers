import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Maintenance from "./index";
import "@/components/LiquidEther.css"
function MyApp() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <Maintenance />
    </ThemeProvider>
  );
}

export default MyApp;
