import { alpha } from "@mui/material";
import { brand, gray, green, orange, red } from "./custom-colors";

const lightPalette = {
  mode: "light",
  brand,
  gray,
  green,
  orange,
  red,

  primary: {
    light: brand[200],
    main: brand[400],
    dark: brand[700],
    contrastText: brand[50],
  },
  error: {
    light: red[300],
    main: red[400],
    dark: red[800],
    contrastText: gray[50],
  },
  warning: {
    light: orange[300],
    main: orange[400],
    dark: orange[800],
    contrastText: gray[900],
  },
  success: {
    light: green[300],
    main: green[400],
    dark: green[800],
    contrastText: gray[900],
  },
  text: {
    primary: gray[800],
    secondary: gray[600],
  },
  background: {
    default: gray[50],
    paper: gray[100],
  },
  divider: alpha(gray[300], 0.4),
  action: {
    hover: alpha(gray[200], 0.2),
    selected: alpha(gray[200], 0.3),
  },
};

export default lightPalette;
