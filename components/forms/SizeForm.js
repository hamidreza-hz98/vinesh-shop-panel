"use client";

import { countries } from "@/constants/countries";
import { sizeDefaultValues } from "@/constants/default-form-values";
import { sizeSchema } from "@/constants/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const SizeForm = ({ mode, data, onClose, onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(sizeSchema),
    defaultValues: sizeDefaultValues(data),
  });

  React.useEffect(() => {
    reset(sizeDefaultValues(data));
  }, [mode, data, reset]);

  const onSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData);

    setTimeout(() => {
      reset();

      onSuccess && onSuccess();
    }, 500);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mt: 2 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="dimensions.width"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Width"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">CM</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="dimensions.height"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Height"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">CM</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="dimensions.depth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Depth"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">CM</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="dimensions.weight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Weight"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">KG</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="translations"
            control={control}
            render={({ field }) => {
              const translations = field.value || [];

              const handleNameChange = (index, newValue) => {
                const updated = translations.map((item, i) =>
                  i === index ? { ...item, name: newValue } : item
                );
                field.onChange(updated);
              };

              const handleAddLanguage = (lang) => {
                if (!translations.find((t) => t.lang === lang.code)) {
                  const updated = [
                    ...translations,
                    { lang: lang.code, name: "" },
                  ];
                  field.onChange(updated);
                }
              };

              return (
                <>
                  {translations.map((t, index) => (
                    <TextField
                      key={t.lang}
                      value={t.name}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      label={`Name (${t.lang.toUpperCase()})`}
                      error={!!errors?.translations?.[index]?.name}
                      helperText={errors?.translations?.[index]?.name?.message}
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  ))}

                  <Autocomplete
                    sx={{ mt: 2 }}
                    fullWidth
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, newValue) =>
                      newValue && handleAddLanguage(newValue)
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Image
                          src={option.flag}
                          alt={option.label}
                          width={20}
                          height={14}
                        />
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Language" />
                    )}
                    slotProps={{
                      popper: { sx: { zIndex: 8000 } },
                    }}
                  />
                </>
              );
            }}
          />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SizeForm;
