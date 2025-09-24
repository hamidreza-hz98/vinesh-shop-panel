"use client";

import { transactionDefaultValues } from "@/constants/default-form-values";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const TransactionForm = ({ mode, data, onClose, onSuccess }) => {
  const isEdit = mode === "edit";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: transactionDefaultValues(data),
  });

  React.useEffect(() => {
    reset(transactionDefaultValues(data));
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
                        <Button variant="contained" size="small">
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
          name="trackingCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tracking Code"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="referrerBank"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Referrer Bank"
              fullWidth
              size="small"
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="createdAt"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            const value = field.value;

            return (
              <Chip
                label={value}
                color={value === "successful" ? "success" : "error"}
                variant="outlined"
                size="large"
              />
            );
          }}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              size="small"
              fullWidth
              disabled={isEdit}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default TransactionForm;
