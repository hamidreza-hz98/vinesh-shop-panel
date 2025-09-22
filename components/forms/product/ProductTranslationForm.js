"use client";

import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function ProductTranslationForm({
  control,
  lang,
  currency,
  setValue,
  watch,
}) {
  const name = watch(`translations.${lang}.name`);
  const price = watch(`translations.${lang}.price`);
  const discountAmount = watch(`translations.${lang}.discount.amount`);
  const discountType = watch(`translations.${lang}.discount.type`);

  const priceAfterDiscount =
    discountType === "percentage"
      ? price - (price * discountAmount) / 100
      : price - discountAmount;

  React.useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setValue(`translations.${lang}.slug`, slug, { shouldValidate: true });
    } else {
      setValue(`translations.${lang}.slug`, "");
    }
  }, [name, lang, setValue]);

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Translation ({lang.toUpperCase()})
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${lang}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Name" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${lang}.slug`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Slug" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Controller
            name={`translations.${lang}.excerpt`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Excerpt" fullWidth size="small" />
            )}
          />
        </Grid>

        {/* Colors */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name={`translations.${lang}.colors`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <TextField
                {...field}
                label="Colors (comma separated)"
                fullWidth
                size="small"
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(e.target.value.split(",").map((v) => v.trim()))
                }
              />
            )}
          />
        </Grid>

        {/* Sizes */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name={`translations.${lang}.sizes`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <TextField
                {...field}
                label="Sizes (comma separated)"
                fullWidth
                size="small"
                value={field.value?.join(", ") || ""}
                onChange={(e) =>
                  field.onChange(e.target.value.split(",").map((v) => v.trim()))
                }
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid item size={{ xs: 12 }}>
          <Controller
            name={`translations.${lang}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                size="small"
                multiline
                minRows={3}
              />
            )}
          />
        </Grid>

        {/* Technical Details */}
        <Grid item size={{ xs: 12 }}>
          <Controller
            name={`translations.${lang}.technicalDetails`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Technical Details"
                fullWidth
                size="small"
                multiline
                minRows={3}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Typography variant="subtitle1">Price</Typography>
        </Grid>

                    <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <Controller
            name={`translations.${lang}.price`}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                fullWidth
                size="small"
                type="number"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">{currency}</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* Discount */}
        <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <Controller
            name={`translations.${lang}.discount.amount`}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Discount"
                fullWidth
                size="small"
                type="number"
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <Controller
            name={`translations.${lang}.discount.type`}
            control={control}
            defaultValue="amount"
            render={({ field }) => (
              <TextField {...field} label="Type" select fullWidth size="small">
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <TextField
            value={priceAfterDiscount > 0 ? priceAfterDiscount : 0}
            label="Final Price"
            fullWidth
            size="small"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">{currency}</InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* SEO Fields */}
        <Grid item size={{ xs: 12 }}>
          <Typography variant="subtitle1">SEO</Typography>
        </Grid>

        {[
          "title",
          "description",
          "keywords",
          "ogTitle",
          "ogDescription",
          "ogImage",
          "twitterTitle",
          "twitterDescription",
          "twitterImage",
          "canonical",
          "robots",
          "additionalMetaTags",
        ].map((seoField) => (
          <Grid key={seoField} item size={{ xs: 12, sm: 6 }}>
            <Controller
              name={`translations.${lang}.seo.${seoField}`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={`SEO ${seoField}`}
                  fullWidth
                  size="small"
                  multiline={[
                    "description",
                    "ogDescription",
                    "twitterDescription",
                    "additionalMetaTags",
                  ].includes(seoField)}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
