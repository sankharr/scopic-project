import { useEffect } from "react";
import style from "./App.module.css";
import LeagueService from "./services/LeagueService";
import MainLayout from "./layouts/MainLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 750,
      lg: 1000,
      xl: 1536,
    },
  },
});

function App() {
  // let leagueObject;

  return (
    <>
      <ThemeProvider theme={theme}>
        <MainLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
