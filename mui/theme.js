import { createTheme } from "@mui/material";
import darkPalette from "./palette/dark";
import lightPalette from "./palette/light";

export const darkTheme = createTheme({
  palette: darkPalette,
});

export const lightTheme = createTheme({
  palette: lightPalette,
});
