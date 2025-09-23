"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Autocomplete,
  Grid,
} from "@mui/material";
import ProductField from "../Fields/ProductField";
import { orderStatuses } from "@/constants/general";
import { orderDefaultValues } from "@/constants/default-form-values";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/constants/validations";
import { PRODUCTS_MOCK_DATA, USERS_MOCK_DATA } from "@/constants/MOCK_DATA";

const OrderForm = ({ data, transactions = [], onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: orderDefaultValues(data),
  });

  const products = PRODUCTS_MOCK_DATA;
  const users = USERS_MOCK_DATA;

  const selectedProducts = watch("products");
  const shipmentPrice = watch("shipmentPrice");

  useEffect(() => {
  if (!Array.isArray(selectedProducts)) return;

  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + (p.price?.amount || 0) * (p.quantity || 1),
    0
  );

  const totalDiscount = selectedProducts.reduce((sum, p) => {
    if (p.discount?.type === "percentage") {
      return (
        sum +
        ((p.price?.amount || 0) * (p.discount.amount || 0) / 100) *
          (p.quantity || 1)
      );
    } else if (p.discount?.type === "flat") {
      return sum + (p.discount.amount || 0) * (p.quantity || 1);
    }
    return sum;
  }, 0);

  setValue("price", totalPrice.toFixed(2));
  setValue("discount", totalDiscount.toFixed(2));
  setValue(
    "finalCost",
    (totalPrice - totalDiscount + Number(shipmentPrice || 0)).toFixed(2)
  );
}, [selectedProducts, shipmentPrice, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="grid" gap={2}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 4 }}>
            {/* Track Number */}
            <Controller
              name="trackNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Track Number"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 4 }}>
            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} select label="Status">
                  {Object.entries(orderStatuses).map(([key, val]) => (
                    <MenuItem key={key} value={key}>
                      {val.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Order Type */}
          <Grid size={{ xs: 4 }}>
            <Controller
              name="orderType"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} select label="Order Type">
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="telephone">Telephone</MenuItem>
                  <MenuItem value="in-person">In-Person</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Address */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Address</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="address.name"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} label="Name" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="address.recipient"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} label="Recipient" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="address.phone"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} label="Phone" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="address.zipCode"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} label="Zip Code" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="address.address"
              control={control}
              render={({ field }) => (
                <TextField fullWidth {...field} label="Address" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Products</Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* Products */}
            <ProductField
              control={control}
              name="products"
              productsOptions={products}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Price</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            {/* Prices */}
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Discount"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="shipmentPrice"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Shipment Price" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="finalCost"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Final Cost"
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* Transaction */}
            <Controller
              name="transaction"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={transactions}
                  getOptionLabel={(opt) => opt.name}
                  onChange={(_, val) => field.onChange(val?.id || "")}
                  renderInput={(params) => (
                    <TextField {...params} label="Transaction" />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {/* User */}
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={users}
                  getOptionLabel={(opt) => opt.firstName + " " + opt.lastName}
                  onChange={(_, val) => field.onChange(val?.id || "")}
                  renderInput={(params) => (
                    <TextField {...params} label="User" />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* Submit */}
            <Button type="submit" variant="contained">
              Save Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default OrderForm;
