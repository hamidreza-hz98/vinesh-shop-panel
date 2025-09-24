"use client";

import { couponDefaultValues } from "@/constants/default-form-values";
import { couponSchema } from "@/constants/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Box,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "../Fields/CustomDatePicker";
import ProductField from "../Fields/ProductField";
import { PRODUCTS_MOCK_DATA, USERS_MOCK_DATA } from "@/constants/MOCK_DATA";

const CouponForm = ({ mode, data, onClose, onSuccess }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(couponSchema),
    defaultValues: couponDefaultValues(data),
  });

  React.useEffect(() => {
    reset(couponDefaultValues(data));
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Code"
                error={!!errors.code}
                helperText={errors.code?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                labelId="coupon-type-label"
                label="Coupon Type"
              >
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="prize">Prize</MenuItem>
              </Select>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography mb={1}>
            Coupon Expiry
          </Typography>

          <Controller
            name="expiry"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                {...field}
                error={!!errors.expiry}
                helperText={errors.expiry?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="usageNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Usage"
                error={!!errors.usageNumber}
                helperText={errors.usageNumber?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="percentage"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                min={0}
                max={100}
                label="Percentage"
                error={!!errors.percentage}
                helperText={errors.percentage?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="amount.amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Amount"
                error={!!errors.amount?.amount}
                helperText={errors.amount?.amount?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="amount.currency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Currency"
                error={!!errors.amount?.cyrrency}
                helperText={errors.amount?.cyrrency?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="products"
            control={control}
            render={({ field }) => (
              <ProductField
                {...field}
                control={control}
                name="products"
                productsOptions={PRODUCTS_MOCK_DATA}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="users"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={USERS_MOCK_DATA}
                getOptionLabel={(option) => option.phoneNumber}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Users" />
                )}
                 slotProps={{
              popper: {
                sx: {
                  zIndex: 8000,
                },
              },
            }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CouponForm;
