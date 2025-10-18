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
import CustomDatePicker from "../Fields/CustomDatePicker";
import { userSchema } from "@/constants/validations";
import { userDefaultFormValues } from "@/constants/default-form-values";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "@/store/user/user.action";

export default function UserForm({ mode, data, onClose, onSuccess, onError }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: userDefaultFormValues(data),
  });

  React.useEffect(() => {
    reset(userDefaultFormValues(data));
  }, [mode, data, reset]);

  const onSubmit = async (body) => {
    let message = "";
    try {
      if (mode === "edit") {
        message = await dispatch(updateUser({ _id: data?._id, body })).unwrap();
      } else {
        message = await dispatch(createUser(body)).unwrap();
      }

      reset();
      onSuccess && onSuccess(message);
    } catch (error) {
      onError && onError(error);
    }
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
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
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
          name="shebaNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Sheba Number"
              error={!!errors.shebaNumber}
              helperText={errors.shebaNumber?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              value={field.value}
              onChange={field.onChange}
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
            />
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
