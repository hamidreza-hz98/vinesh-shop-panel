"use client";

import RichTextEditor from "@/components/Fields/RichTextEditor";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BrandTranslationForm = ({ control, lang, data, setValue, watch }) => {
  const translations = watch("translations") || [];
  const translationIndex = translations.findIndex((t) => t.lang === lang);
  if (translationIndex === -1) {
    setValue("translations", [...translations, { lang }]);
  }

  const currentTranslation = translations[translationIndex] || {};
  const name = currentTranslation.name;

  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (!data || initialized.current) return;
    initialized.current = true;

      setValue(`translations.${translationIndex}`, data, {
        shouldValidate: false,
      });
  }, [data, lang]);

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

        <Grid item size={{ xs: 12 }}>
          <Typography my={2}>Category Description</Typography>

          <Controller
            name={`translations.${translationIndex}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RichTextEditor text={field.value} {...field} />
            )}
          />
        </Grid>

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
              defaultValue={currentTranslation.seo?.[seoField] || ""}
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
};

export default BrandTranslationForm;
