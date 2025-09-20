import { alpha } from '@mui/material/styles';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { iconButtonClasses } from '@mui/material/IconButton';

/* eslint-disable import/prefer-default-export */
const formInputCustomizations = {
  // MuiFormControl: {
  //   styleOverrides: {
  //     root: ({ theme }) => ({
  //       [`& .${inputBaseClasses.root}`]: {
  //         marginTop: 6,
  //       },
  //       [`& .${inputLabelClasses.root}`]: {
  //         transform: 'translate(4px, -11px) scale(0.75)',
  //         [`&.${outlinedInputClasses.focused}`]: {
  //           transform: 'translate(4px, -12px) scale(0.75)',
  //         },
  //       },
  //       [`& .${formHelperTextClasses.root}`]: {
  //         marginLeft: 2,
  //       },
  //       '& .MuiPickersInputBase-root': {
  //         marginTop: 6,
  //         border: `1px solid ${(theme.vars || theme).palette.divider}`,
  //         ' .MuiPickersInputBase-sectionsContainer': {
  //           padding: '10px 0',
  //         },
  //         ' .MuiPickersOutlinedInput-notchedOutline': {
  //           border: 'none',
  //         },
  //         [`&.MuiPickersOutlinedInput-root.Mui-focused`]: {
  //           border: `1px solid ${(theme.vars || theme).palette.divider}`,
  //           outline: `3px solid ${alpha(theme.palette.brand[500], 0.5)}`,
  //           borderColor: theme.palette.brand[400],
  //           ' .MuiPickersOutlinedInput-notchedOutline': {
  //             border: 'none',
  //           },
  //         },
  //         [` .${iconButtonClasses.root}`]: {
  //           border: 'none',
  //           height: '34px',
  //           width: '34px',
  //         },
  //       },
  //     }),
  //   },
  // },
};

export default formInputCustomizations;