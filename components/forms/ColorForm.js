"use client";

import { countries } from "@/constants/countries";
import { colorDefaultValues } from "@/constants/default-form-values";
import { colorSchema } from "@/constants/validations";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { createColor, updateColor } from "@/store/color/color.action";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const ColorForm = ({ mode, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const notifications = useNotifications();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(colorSchema),
    defaultValues: colorDefaultValues(data),
  });

  React.useEffect(() => {
    reset(colorDefaultValues(data));
  }, [mode, data, reset]);

  const onSubmit = async (body) => {
    mode === "edit"
      ? await dispatch(updateColor({ _id: data?._id, body })).unwrap()
      : await dispatch(createColor(body)).unwrap();

    onSuccess && onSuccess();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mt: 2 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 8 }}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Color Code"
                type="color"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
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

export default ColorForm;
