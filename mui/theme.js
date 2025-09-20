import { createTheme } from "@mui/material";
import darkPalette from "./palette/dark";
import lightPalette from "./palette/light";
import datePickersCustomizations from "./components/datePickers";
import dataGridCustomizations from "./components/dataGrid";
import formInputCustomizations from "./components/formInput";
import sidebarCustomizations from "./components/sidebar";
import dataDisplayCustomizations from "./components/dataDisplay";
import feedbackCustomizations from "./components/feedback"; 
import inputsCustomizations from "./components/inputs";
import navigationCustomizations from "./components/navigation";
import surfacesCustomizations from "./components/surfaces";

export const darkTheme = createTheme({
  palette: darkPalette,
  components: {
    ...datePickersCustomizations,
    ...dataGridCustomizations,
    ...formInputCustomizations,
    ...sidebarCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...inputsCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations
  }
});

export const lightTheme = createTheme({
  palette: lightPalette,
  components: {
    ...datePickersCustomizations,
    ...dataGridCustomizations,
    ...formInputCustomizations,
    ...sidebarCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...inputsCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations
  }
});
