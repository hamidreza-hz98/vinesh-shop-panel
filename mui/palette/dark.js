import { alpha } from "@mui/material";
import { brand, gray, green, orange, red } from "./custom-colors";

const darkPalette = {
  mode: "dark",
  brand,
  gray,
  green,
  orange,
  red,

  primary: {
    light: brand[300],
    main: brand[400],
    dark: brand[700],
    contrastText: brand[50],
  },
  error: {
    light: red[400],
    main: red[300],
    dark: red[700],
    contrastText: brand[50],
  },
  warning: {
    light: orange[400],
    main: orange[500],
    dark: orange[700],
    contrastText: brand[50],
  },
  success: {
    light: green[400],
    main: green[500],
    dark: green[700],
    contrastText: brand[50],
  },
  text: {
    primary: brand[50],
    secondary: gray[400],
  },
  background: {
    default: gray[900],
    paper: 'hsl(220, 10%, 7%)',
  },
  divider: alpha(gray[500], 0.6),
  action: {
    hover: alpha(gray[600], 0.2),
    selected: alpha(gray[600], 0.3),
  },
};

export default darkPalette;
