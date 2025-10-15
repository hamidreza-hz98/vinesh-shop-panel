"use client";

import React from "react";
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
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectTags } from "@/store/tag/tag.selector";
import { getAlltags } from "@/store/tag/tag.action";
import QueryString from "qs";
import { setFilePath } from "@/lib/media";
import Loader from "@/components/common/Loader";

const CategoryGeneralForm = ({ control, setValue, mode, data }) => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);

  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  // Load tags
  React.useEffect(() => {
    dispatch(getAlltags(QueryString.stringify({ lang: "us" })));
  }, [dispatch]);

  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (!tags || !data?._id || initialized.current) return;
    initialized.current = true;

    // Set UI media objects
    const mediaFields = ["image", "icon"];
    const mediaPreview = {};
    mediaFields.forEach((field) => {
      if (data[field]) mediaPreview[field] = data[field];
      // setValue only sets the _id for backend
      setValue(field, data[field]?._id || null);
    });
    setSelectedMediaObjects(mediaPreview);

    // Set standard fields
    ["isActive", "subCategories"].forEach((key) => {
      if (data[key] !== undefined) setValue(key, data[key]);
    });

    // Tags
    if (data.tags) setValue("tags", data.tags.map((t) => (t?._id ? t._id : t)));
  }, [data, tags, setValue]);

  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    if (!activeField || !media) return;

    // Set _id(s) for backend
    const ids = drawerMultiple
      ? media.map((m) => m?._id)
      : media[0]?._id;
    setValue(activeField, ids);

    // Store full objects for UI
    setSelectedMediaObjects((prev) => ({
      ...prev,
      [activeField]: drawerMultiple ? media : media[0] || null,
    }));

    setDrawerOpen(false);
  };

  if (mode === "edit" && (!data || tags?.length === 0)) return <Loader />;

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Grid container spacing={2}>
        {/* Sub Categories */}
        <Grid size={{xs:12, sm:6, md:4}}>
          <Controller
            name="subCategories"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                size="small"
                fullWidth
                options={[]} // real options here
                getOptionLabel={(option) => option?.label || ""}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Sub Categories" />
                )}
              />
            )}
          />
        </Grid>

        {/* Tags */}
        <Grid size={{xs:12, sm:6, md:4}}>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const selectedTags = (field.value || [])
                .map((item) =>
                  tags.find((t) => t._id === (item?._id || item))
                )
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
                  renderInput={(params) => <TextField {...params} label="Tags" />}
                />
              );
            }}
          />
        </Grid>

        {/* Is Active */}
        <Grid size={{xs:12, sm:6, md:4}}>
          <Controller
            name="isActive"
            control={control}
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

        {/* Media Fields */}
        {["image", "icon"].map((fieldName) => (
          <Grid key={fieldName} size={{xs: 12}}>
            <Stack spacing={1}>
              <Typography>
                {fieldName === "image" ? "Category Main Image" : "Category Icon"}
              </Typography>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => openMediaDrawer(fieldName, "image", false)}
              >
                Select from Media Library
              </Button>

              {selectedMediaObjects[fieldName] && (
                <Image
                  src={setFilePath(selectedMediaObjects[fieldName].path)}
                  alt={selectedMediaObjects[fieldName]?.translations?.[0]?.title || "media"}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              )}
            </Stack>
          </Grid>
        ))}

        {/* Shared Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ sx: { zIndex: (theme) => theme.zIndex.modal + 1000 } }}
          PaperProps={{ sx: { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 } }}
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

export default CategoryGeneralForm;
