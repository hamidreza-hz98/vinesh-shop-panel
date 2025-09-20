"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { mediaSchema } from "@/constants/validations";
import { mediaDefaultFormValues } from "@/constants/default-form-values";
import FileUpload from "../Fields/FileUpload";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function MediaForm({ mode, data, onClose, onSuccess }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(mediaSchema),
    defaultValues: mediaDefaultFormValues(data),
  });

  React.useEffect(() => {
    reset(mediaDefaultFormValues(data));
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
      sx={{ width: "100%" }}
    >
      <Stack spacing={2}>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FileUpload
              {...field}
              label="File"
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="altText"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Alt Text"
              error={!!errors.altText}
              helperText={errors.altText?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="isPublic"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} defaultChecked={field.value} />}
              label="Is Public"
              error={!!errors.isPublic}
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "Update" : "Upload"}
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
