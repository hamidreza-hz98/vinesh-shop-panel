import { alpha } from '@mui/material/styles';
import { menuItemClasses } from '@mui/material/MenuItem';
import { pickersDayClasses, yearCalendarClasses } from '@mui/x-date-pickers';

const datePickersCustomizations = {
  MuiPickerPopper: {
    styleOverrides: {
      root: ({ theme }) => ({
        zIndex: (theme.zIndex.modal || 1300) + 2000,
      }),
      paper: ({ theme }) => ({
        marginTop: 4,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        background: (theme.vars || theme).palette.background.paper,
        color: (theme.vars || theme).palette.text.primary,
        boxShadow:
          '0 4px 16px 0px hsla(220, 30%, 5%, 0.07), 0 8px 16px -5px hsla(220, 25%, 10%, 0.07)',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        ...theme.applyStyles('dark', {
          background: (theme.vars || theme).palette.background.paper,
          color: (theme.vars || theme).palette.text.primary,
          boxShadow:
            '0 4px 16px 0px hsla(220, 30%, 5%, 0.7), 0 8px 16px -5px hsla(220, 25%, 10%, 0.8)',
        }),
      }),
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: ({ theme }) => ({
        padding: 0,
        border: 'none',
        color: (theme.vars || theme).palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        background: 'transparent',
        '&:hover': {
          background: alpha((theme.vars || theme).palette.primary.main, 0.08),
        },
      }),
      label: ({ theme }) => ({
        color: (theme.vars || theme).palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
      }),
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.text.primary,
        background: 'transparent',
        borderRadius: theme.shape.borderRadius,
        transition: 'background 0.2s',
        '&:hover': {
          backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.12),
        },
        [`&.${pickersDayClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
        },
        '&:focus': {
          outline: `2px solid ${alpha((theme.vars || theme).palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.text.primary,
          '&:hover': {
            backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.18),
          },
          [`&.${pickersDayClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
        }),
      }),
    },
  },
  MuiMonthCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.text.primary,
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
          backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.12),
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
        },
        '&:focus': {
          outline: `2px solid ${alpha((theme.vars || theme).palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.text.primary,
          '&:hover': {
            backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.18),
          },
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
        }),
      }),
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        color: (theme.vars || theme).palette.text.primary,
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        height: 'fit-content',
        '&:hover': {
          backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.12),
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
          color: (theme.vars || theme).palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
        },
        '&:focus': {
          outline: `2px solid ${alpha((theme.vars || theme).palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.text.primary,
          '&:hover': {
            backgroundColor: alpha((theme.vars || theme).palette.primary.main, 0.18),
          },
          [`&.${yearCalendarClasses.selected}`]: {
            backgroundColor: (theme.vars || theme).palette.primary.main,
            color: (theme.vars || theme).palette.primary.contrastText,
            fontWeight: theme.typography.fontWeightBold,
          },
        }),
      }),
    },
  },
};

export default datePickersCustomizations;