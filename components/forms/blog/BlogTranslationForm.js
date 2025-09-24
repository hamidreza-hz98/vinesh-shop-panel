"use client";

import RichTextEditor from "@/components/Fields/RichTextEditor";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const BlogTranslationForm = ({ control, lang, setValue, watch }) => {
  const translations = watch("translations") || [];
  const translationIndex = translations.findIndex((t) => t.lang === lang);
  const currentTranslation = translations[translationIndex] || {};
  if (translationIndex === -1) {
    setValue("translations", [...translations, { lang }]);
  }

  const title = currentTranslation.title;

  React.useEffect(() => {
    if (title) {
      const slug = title
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
  }, [title, lang, setValue, translationIndex]);

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Translation ({lang.toUpperCase()})
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.title`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Title" fullWidth size="small" />
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

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.author`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Author" fullWidth size="small" />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`translations.${translationIndex}.timeToRead`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Time To Read"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Typography my={2}>Blog Content</Typography>

          <Controller
            name={`translations.${translationIndex}.text`}
            control={control}
            defaultValue=""
            render={({ field }) => <RichTextEditor {...field} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogTranslationForm;
