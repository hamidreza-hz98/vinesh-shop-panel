"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { cartDefaultValues } from "@/constants/default-form-values";

export default function CartForm({ mode, data, onClose, onSuccess }) {
  const isEdit = mode === "edit";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: cartDefaultValues(data),
  });

  React.useEffect(() => {
    reset(cartDefaultValues(data));
  }, [data, reset]);

  const onSubmit = async (formData) => {
    console.log("Cart submitted:", formData);
    onSuccess && onSuccess();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Stack spacing={2}>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="User"
              fullWidth
              size="small"
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="User Email"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="userPhone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="User Phone"
              fullWidth
              size="small"
              disabled={isEdit}
              InputProps={{
                endAdornment:
                  isEdit && data?.user?.phoneNumber ? (
                    <InputAdornment position="end">
                      <Link
                        href={`tel:${data.user.phoneNumber}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained"  size="small">
                          Call to User
                        </Button>
                      </Link>
                    </InputAdornment>
                  ) : null,
              }}
            />
          )}
        />

        <Controller
          name="products"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Products"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="suggestedProducts"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Suggested Products"
              fullWidth
              size="small"
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="coupon"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Coupon Code"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Price"
              fullWidth
              disabled
            />
          )}
        />

        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Discount"
              fullWidth
              disabled
            />
          )}
        />

        <Controller
          name="shipping"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Shipping"
              fullWidth
              disabled
            />
          )}
        />

        <Controller
          name="finalPrice"
          control={control}
          render={({ field }) => (
            <TextField
              size="small"
              {...field}
              label="Final Price"
              fullWidth
              disabled
            />
          )}
        />

        {!isEdit && (
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "Update" : "Create"}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
