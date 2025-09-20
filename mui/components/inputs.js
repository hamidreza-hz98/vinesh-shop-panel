import * as React from "react";
import { alpha } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

/* eslint-disable import/prefer-default-export */
const inputsCustomizations = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: "border-box",
        transition: "all 100ms ease-in",
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: "2px",
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        padding: "0 16px",
        fontWeight: 500,
        "&.MuiButton-sizeSmall": {
          height: "2.25rem", // 36px
          padding: "0 12px",
        },
        "&.MuiButton-sizeMedium": {
          height: "2.5rem", // 40px
          padding: "0 16px",
        },
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: (theme.vars || theme).palette.text.primary,
        border: "1px solid",
        borderColor: theme.palette.gray[200],
        backgroundColor: alpha(theme.palette.gray[50], 0.3),
        "&:hover": {
          backgroundColor: theme.palette.gray[100],
          borderColor: theme.palette.gray[300],
        },
        "&:active": {
          backgroundColor: theme.palette.gray[200],
        },
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.gray[800],
          borderColor: theme.palette.gray[700],
          "&:hover": {
            backgroundColor: theme.palette.gray[900],
            borderColor: theme.palette.gray[600],
          },
          "&:active": {
            backgroundColor: theme.palette.gray[900],
          },
        }),
        "&.MuiIconButton-sizeSmall": {
          width: "2.25rem",
          height: "2.25rem",
          padding: "0.25rem",
          [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
        },
        "&.MuiIconButton-sizeMedium": {
          width: "2.5rem",
          height: "2.5rem",
        },
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "10px",
        boxShadow: `0 4px 16px ${alpha(theme.palette.gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: theme.palette.brand[500],
        },
        ...theme.applyStyles("dark", {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: "#fff",
          },
          boxShadow: `0 4px 16px ${alpha(theme.palette.brand[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 500,
        height: "2.5rem",
        padding: "0 16px",
        "&.MuiToggleButton-sizeSmall": {
          height: "2.25rem",
          padding: "0 12px",
        },
        "&.MuiToggleButton-sizeMedium": {
          height: "2.5rem",
          padding: "0 16px",
        },
        ...theme.applyStyles("dark", {
          color: theme.palette.gray[400],
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          [`&.${toggleButtonClasses.selected}`]: {
            color: theme.palette.brand[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon
          sx={{ color: "hsla(210, 0%, 0%, 0.0)" }}
        />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: "1px solid ",
        borderColor: alpha(theme.palette.gray[300], 0.8),
        boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
        backgroundColor: alpha(theme.palette.gray[100], 0.4),
        transition: "border-color, background-color, 120ms ease-in",
        "&:hover": {
          borderColor: theme.palette.brand[300],
        },
        "&.Mui-focusVisible": {
          outline: `3px solid ${alpha(theme.palette.brand[500], 0.5)}`,
          outlineOffset: "2px",
          borderColor: theme.palette.brand[400],
        },
        "&.Mui-checked": {
          color: "white",
          backgroundColor: theme.palette.brand[500],
          borderColor: theme.palette.brand[500],
          boxShadow: `none`,
          "&:hover": {
            backgroundColor: theme.palette.brand[600],
          },
        },
        ...theme.applyStyles("dark", {
          borderColor: alpha(theme.palette.gray[700], 0.8),
          boxShadow: "0 0 0 1.5px hsl(210, 0%, 0%) inset",
          backgroundColor: alpha(theme.palette.gray[900], 0.8),
          "&:hover": {
            borderColor: theme.palette.brand[300],
          },
          "&.Mui-focusVisible": {
            borderColor: theme.palette.brand[400],
            outline: `3px solid ${alpha(theme.palette.brand[500], 0.5)}`,
            outlineOffset: "2px",
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: "none",
      },
      input: ({ theme }) => ({
        "&::placeholder": {
          opacity: 0.7,
          color: theme.palette.gray[500],
        },
      }),
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles("dark", {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
};

export default inputsCustomizations;
