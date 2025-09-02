"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@/mui/theme";
import React, { createContext, useContext, useState } from "react";

const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function AppThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("dark");

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}