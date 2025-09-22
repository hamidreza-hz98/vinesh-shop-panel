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

const CategoryGeneralForm = ({ control }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);

  const toggleMediaDrawer = (type, multiple) => {
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ width: "100%", marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="subCategories"
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
                  <TextField {...params} label="Sub Categories" />
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
            defaultValue={{}}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>Category Image</Typography>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => toggleMediaDrawer("image", false)}
                >
                  Select from Media Library
                </Button>

                <Stack direction="row" spacing={1} mt={1}>
                  {field.value && (
                    <Box>
                      {field.value?.type === "image" ? (
                        <Image
                          src={field.value?.src || field.value?.img}
                          alt={field.value?.title || `media`}
                          width={60}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      ) : (
                        <Typography>
                          {field.value?.title || field.value?.src}
                        </Typography>
                      )}
                    </Box>
                  )}
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
                      onSelect={(media) => {
                        if (drawerMultiple) {
                          field.onChange([...(field.value || []), ...media]);
                        } else {
                          field.onChange(...media);
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
          <Controller
            name="icon"
            control={control}
            defaultValue={{}}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>Category Icon</Typography>

                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => toggleMediaDrawer("icon", false)}
                >
                  Select from Media Library
                </Button>

                <Stack direction="row" spacing={1} mt={1}>
                  {field.value && (
                    <Box>
                      {field.value?.type === "icon" ? (
                        <Image
                          src={field.value?.src || field.value?.img}
                          alt={field.value?.title || `media`}
                          width={60}
                          height={60}
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      ) : (
                        <Typography>
                          {field.value?.title || field.value?.src}
                        </Typography>
                      )}
                    </Box>
                  )}
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
                      onSelect={(media) => {
                        if (drawerMultiple) {
                          field.onChange([...(field.value || []), ...media]);
                        } else {
                          field.onChange(...media);
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
      </Grid>
    </Box>
  );
};

export default CategoryGeneralForm;
