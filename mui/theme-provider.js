"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "@/mui/theme";

export default function AppThemeProvider({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* Reset & normalize styles */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
