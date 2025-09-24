"use client";

import { Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const ProductField = ({ control, name, productsOptions }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value = [], onChange } }) => (
        <Box>
          {/* Autocomplete with multiple products */}
          <Autocomplete
            multiple
            fullWidth
            options={productsOptions}
            getOptionLabel={(opt) => opt.name}
            value={value}
            onChange={(_, newProducts) => {
              // Ensure we initialize quantities
              const merged = newProducts.map((p) => {
                const existing = value.find((v) => v.id === p.id);
                return existing ? existing : { ...p, quantity: 1 };
              });
              onChange(merged);
            }}
            renderInput={(params) => <TextField {...params} label="Products" />}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option.id}
                  label={option.name}
                />
              ))
            }
            slotProps={{
              popper: {
                sx: {
                  zIndex: 8000,
                },
              },
            }}
          />

          {/* Selected product list */}
          {value?.map((product) => (
            <Box
              key={product.id}
              display="flex"
              alignItems="center"
              gap={2}
              mt={1}
              p={1}
              border="1px solid #ddd"
              borderRadius={2}
            >
              {/* First image */}
              {product.media?.length > 0 && (
                <img
                  src={product.media[0].src}
                  alt={product.media[0].title || product.name}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              )}

              {/* Basic info */}
              <Box flexGrow={1}>
                <Typography fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.excerpt}
                </Typography>
                <Typography variant="body2">
                  Price: {product.price.amount}
                  {product.price.currency}{" "}
                  {product.discount?.amount > 0 &&
                    `(Discount: ${product.discount.amount}${
                      product.discount.type === "percentage"
                        ? "%"
                        : product.price.currency
                    })`}
                </Typography>
              </Box>

              {/* Quantity controls */}
              <IconButton
                onClick={() =>
                  onChange(
                    value.map((p) =>
                      p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    )
                  )
                }
              >
                <Add />
              </IconButton>
              <Typography>{product.quantity}</Typography>
              <IconButton
                onClick={() =>
                  onChange(
                    value.map((p) =>
                      p.id === product.id && p.quantity > 1
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                    )
                  )
                }
              >
                <Remove />
              </IconButton>
              <IconButton
                onClick={() =>
                  onChange(value.filter((p) => p.id !== product.id))
                }
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    />
  );
};

export default ProductField;
