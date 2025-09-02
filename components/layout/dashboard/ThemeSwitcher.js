"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "@/mui/theme-provider";

export default function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useThemeMode();

  const toggleMode = React.useCallback(() => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [setThemeMode, themeMode]);

  return (
    <Tooltip
      title={`${themeMode === "dark" ? "Light" : "Dark"} mode`}
      enterDelay={1000}
    >
      <IconButton
        size="small"
        aria-label={`Switch to ${
          themeMode === "dark" ? "light" : "dark"
        } mode`}
        onClick={toggleMode}
      >
        {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}