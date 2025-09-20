"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminSchema } from "@/constants/validations";
import { adminDefaultFormValues } from "@/constants/default-form-values";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import roles from "@/constants/roles";

export default function AdminForm({ mode, data, onClose, onSuccess }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema),
    defaultValues: adminDefaultFormValues(data),
  });

  React.useEffect(() => {
    reset(adminDefaultFormValues(data));
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
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              error={!!errors.username}
              helperText={errors.username?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              error={!!errors.role}
              helperText={errors.role?.message}
              fullWidth
            >
              {roles.map((role) => (
                <FormControlLabel
                  key={role.value}
                  value={role.value}
                  control={<Radio />}
                  label={role.label}
                />
              ))}
            </RadioGroup>
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
