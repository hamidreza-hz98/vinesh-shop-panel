"use client";

import RichTextEditor from "@/components/Fields/RichTextEditor";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";

const CategoryTranslationForm = ({
  control,
  lang,
  currency,
  setValue,
  watch,
}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);

  const toggleMediaDrawer = (type, multiple) => {
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(!drawerOpen);
  };

  const translations = watch("translations") || [];
  const translationIndex = translations.findIndex((t) => t.lang === lang);
  const currentTranslation = translations[translationIndex] || {};
  if (translationIndex === -1) {
    setValue("translations", [...translations, { lang }]);
  }

  const name = currentTranslation.name;

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
            render={({ field }) => <RichTextEditor {...field} />}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Controller
            name="banners"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>Category Banners</Typography>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => toggleMediaDrawer("image", true)}
                >
                  Select from Media Library
                </Button>

                <Stack direction="row" spacing={1} mt={1}>
                  {field.value?.map((file, idx) => (
                    <Box key={idx}>
                      {file.type === "image" ? (
                        <Image
                          src={file.src || file.img}
                          alt={file.title || `media-${idx}`}
                          width={60}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      ) : (
                        <Typography>{file.title || file.src}</Typography>
                      )}
                    </Box>
                  ))}
                </Stack>

                {/* Drawer */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => toggleMediaDrawer("image", false)}
                  ModalProps={{
                    sx: {
                      zIndex: (theme) => theme.zIndex.modal + 1000,
                    },
                  }}
                  PaperProps={{
                    sx: {
                      width: "100vw",
                      height: "100vh",
                      maxWidth: "100vw",
                      top: 0,
                    },
                  }}
                >
                  <Box sx={{ width: "100vw", height: "100vh" }}>
                    <MediaPageWrapper
                      onChange={(media) => {
                        // ✅ Push media into form
                        if (drawerMultiple) {
                          field.onChange([...(field.value || []), ...media]);
                        } else {
                          field.onChange(media);
                        }
                        setDrawerOpen(false);
                      }}
                      isOnForm
                      type={drawerType}
                      multiple={drawerMultiple}
                    />
                  </Box>
                </Drawer>
              </Stack>
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
};

export default CategoryTranslationForm;
