const autoCompleteCustomizations = {
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          "& .MuiAutocomplete-endAdornment": {
            right: 0,
          },
        },
      },
    },
  },
};

export default autoCompleteCustomizations;
