"use client";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
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

const BlogGeneralForm = ({ control, setValue }) => {
  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);

  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    if (!activeField) return;
    setValue(activeField, media[0] || null);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="categories"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={[]}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Categories" />
                )}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={[]}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="suggestedProducts"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={[]}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Suggested Products" />
                )}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="relatedBlogs"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={[]}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Related Blogs" />
                )}
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="isPublished"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Is Published"
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="isFeatured"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Is Featured"
              />
            )}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>Blog Cover Image</Typography>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => openMediaDrawer("image", "image", false)}
                >
                  Select from Media Library
                </Button>
                {field.value && (
                  <Image
                    src={field.value.img || field.value.src}
                    alt={field.value.title || "media"}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                  />
                )}
              </Stack>
            )}
          />
        </Grid>

         <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                 ModalProps={{
                    sx: {
                      zIndex: (theme) => theme.zIndex.modal + 1000,
                    },
                  }}
                PaperProps={{
                  sx: { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 },
                }}
              >
                <Box sx={{ width: "100vw", height: "100vh" }}>
                  <MediaPageWrapper
                    onSelect={handleSelect}
                    isOnForm
                    type={drawerType}
                    multiple={drawerMultiple}
                  />
                </Box>
              </Drawer>
      </Grid>
    </Box>
  );
};

export default BlogGeneralForm;
