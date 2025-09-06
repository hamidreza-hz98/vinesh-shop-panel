import { createTheme } from "@mui/material";
import darkPalette from "./palette/dark";
import lightPalette from "./palette/light";
import datePickersCustomizations from "./components/datePickers";

export const darkTheme = createTheme({
  palette: darkPalette,
  components: {
    datePickersCustomizations
  }
});

export const lightTheme = createTheme({
  palette: lightPalette,
  components: {
    datePickersCustomizations
  }
});
