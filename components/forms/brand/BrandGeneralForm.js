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
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectBrand } from "@/store/brand/brand.selector";
import { selectTags } from "@/store/tag/tag.selector";
import { selectCategories } from "@/store/category/category.selector";
import Loader from "@/components/common/Loader";
import { setFilePath } from "@/lib/media";
import MediaPreview from "@/components/common/MediaPreview";
import { getAllCategories } from "@/store/category/category.action";
import { getAlltags } from "@/store/tag/tag.action";
import QueryString from "qs";

const BrandGeneralForm = ({ control, setValue, mode, data }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(selectTags);
  const { categories } = useSelector(selectCategories);

  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  const initialized = React.useRef(false);

  React.useEffect(() => {
    const query = { lang: "us" };
    dispatch(getAllCategories(QueryString.stringify(query)));
    dispatch(getAlltags(QueryString.stringify(query)));
  }, [dispatch]);

  React.useEffect(() => {
    if (!categories || !tags || !data?._id || initialized.current) return;
    initialized.current = true;

    const mediaPreview = {};
    if (data.image) mediaPreview.image = data.image;
    setValue("image", data?.image?._id || null);
    setSelectedMediaObjects(mediaPreview);

    [("isFeatured", "isActive")].forEach((key) => {
      if (data[key] !== undefined) setValue(key, data[key]);
    });

    if (data.tags)
      setValue(
        "tags",
        data.tags.map((t) => (t?._id ? t._id : t))
      );

    if (data.categories)
      setValue(
        "categories",
        data.categories.map((t) => (t?._id ? t._id : t))
      );
  }, [data, tags, categories, setValue]);

  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    const ids = drawerMultiple ? media.map((m) => m?._id) : media[0]?._id;
    setValue(activeField, ids);

    setSelectedMediaObjects((prev) => ({
      ...prev,
      [activeField]: drawerMultiple ? media : media[0] || null,
    }));

    setDrawerOpen(false);
  };

  if (mode === "edit" && (!data || !tags || !categories)) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="categories"
            control={control}
            render={({ field }) => {
              const selectedCategories = (field.value || []).map((item) =>
                categories?.find((c) => c._id === (item?._id || item))
              );
              return (
                <Autocomplete
                  multiple
                  size="small"
                  fullWidth
                  options={categories || []}
                  getOptionLabel={(option) => option.name}
                  value={selectedCategories}
                  onChange={(e, newValue) =>
                    field.onChange(newValue.map((c) => c._id))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Categories" />
                  )}
                />
              );
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const selectedTags = (field.value || [])
                .map((item) => tags?.find((t) => t._id === (item?._id || item)))
                .filter(Boolean);

              return (
                <Autocomplete
                  multiple
                  size="small"
                  fullWidth
                  options={tags || []}
                  getOptionLabel={(option) => option?.name || ""}
                  value={selectedTags}
                  onChange={(e, newValue) =>
                    field.onChange(newValue.map((t) => t._id))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tags" />
                  )}
                />
              );
            }}
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

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="isActive"
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
                label="Is Active"
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
                <Typography>Brand Main Image</Typography>
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => openMediaDrawer("image", "image", false)}
                >
                  Select from Media Library
                </Button>
                {selectedMediaObjects.image && (
                  <MediaPreview file={selectedMediaObjects.image} />
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

export default BrandGeneralForm;
