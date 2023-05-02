import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import Routing from "./routes/Routes";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </>
  );
}

export default App;



