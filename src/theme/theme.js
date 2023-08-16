import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // palette: {
  //   primary: {
  //     main: "#ff4400",
  //   },
    // secondary: {
    //   // light: "#0066ff",
    //   // main: "#0044ff",
    //   // contrastText: "#ffcc00",
    // },
    // custom: {
    //   light: "#ffa726",
    //   main: "#f57c00",
    //   dark: "#ef6c00",
    //   contrastText: "rgba(0, 0, 0, 0.87)",
    // },
    // contrastThreshold: 3,
    // tonalOffset: 0.2,
  // },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius:8
        },
      },
    },
  },
});

export default theme;
