"use client";

import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Controller } from "react-hook-form";
import RichTextEditor from "@/components/Fields/RichTextEditor";
import TechnicalDetailsField from "@/components/Fields/TechnicalDetailsField";

export default function ProductTranslationForm({
  control,
  lang,
  currency,
  setValue,
  watch,
}) {
  const translations = watch("translations") || [];
  const translationIndex = translations.findIndex((t) => t.lang === lang);
  const currentTranslation = translations[translationIndex] || {};
 if (translationIndex === -1) {
  setValue("translations", [...translations, { lang }]);
}

  const name = currentTranslation.name;
  const price = currentTranslation.price;
  const discountAmount = currentTranslation.discount?.amount;
  const discountType = currentTranslation.discount?.type;

  const priceAfterDiscount =
    price && discountAmount
      ? discountType === "percentage"
        ? price - (price * discountAmount) / 100
        : price - discountAmount
      : price || 0;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      setValue(`translations.${translationIndex}.slug`, slug, {
        shouldValidate: true,
      });
    } else {
      setValue(`translations.${translationIndex}.slug`, "");
    }
  }, [name, lang, setValue, translationIndex]);

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Translation ({lang.toUpperCase()})
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.name`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Name" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.slug`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Slug" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Controller
            name={`translations.${translationIndex}.excerpt`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Excerpt" fullWidth size="small" />
            )}
          />
        </Grid>

        {/* Colors */}
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.colors`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={[]}
                value={field.value || []}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Colors"
                    size="small"
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* Sizes */}
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.sizes`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={[]}
                value={field.value || []}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Sizes" size="small" fullWidth />
                )}
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid item size={{ xs: 12 }}>
          <Typography my={2}>Product Description</Typography>

          <Controller
            name={`translations.${translationIndex}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => <RichTextEditor {...field} />}
          />
        </Grid>

        {/* Technical Details */}
        <Grid item size={{ xs: 12 }}>
          <Typography my={2}>Technical Details</Typography>

          <Controller
            name={`translations.${translationIndex}.technicalDetails`}
            control={control}
            defaultValue={{}}
            render={({ field }) => (
              <TechnicalDetailsField
                value={field.value}
                onChange={field.onChange}
                lang={lang}
                watchForm={watch}
                setValue={setValue}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Typography variant="subtitle1">Price</Typography>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <Controller
            name={`translations.${translationIndex}.price`}
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
            name={`translations.${translationIndex}.discount.amount`}
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
            name={`translations.${translationIndex}.discount.type`}
            control={control}
            defaultValue="percentage"
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
              name={`translations.${translationIndex}.seo.${seoField}`}
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
