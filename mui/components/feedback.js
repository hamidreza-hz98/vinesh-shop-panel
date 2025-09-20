import { alpha } from '@mui/material/styles';

/* eslint-disable import/prefer-default-export */
const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: theme.palette.orange[100],
        color: (theme.vars || theme).palette.text.primary,
        border: `1px solid ${alpha(theme.palette.orange[300], 0.5)}`,
        '& .MuiAlert-icon': {
          color: theme.palette.orange[500],
        },
        ...theme.applyStyles('dark', {
          backgroundColor: `${alpha(theme.palette.orange[900], 0.5)}`,
          border: `1px solid ${alpha(theme.palette.orange[800], 0.5)}`,
        }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: theme.palette.gray[200],
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.gray[800],
        }),
      }),
    },
  },
};

export default feedbackCustomizations;