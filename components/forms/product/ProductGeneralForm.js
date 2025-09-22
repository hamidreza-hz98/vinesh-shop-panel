"use client";

import React from "react";
import {
  Box,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Typography,
  Grid,
  Button,
  Drawer,
} from "@mui/material";
import Image from "next/image";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";

export default function ProductGeneralForm({
  control,
  categoriesOptions = [],
  tagsOptions = [],
  brandsOptions = [],
  productsOptions = [],
}) {

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
        {/* Quantity */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="quantity"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Quantity"
                fullWidth
                size="small"
                type="number"
                inputProps={{ min: 0 }}
              />
            )}
          />
        </Grid>

        {/* Categories */}
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
                options={categoriesOptions}
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

        {/* Tags */}
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
                options={tagsOptions}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            )}
          />
        </Grid>

        {/* Brand */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="brand"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Autocomplete
                size="small"
                fullWidth
                options={brandsOptions}
                getOptionLabel={(option) => option.label}
                value={field.value || null}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" />
                )}
              />
            )}
          />
        </Grid>

        {/* Related Products */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="relatedProducts"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                fullWidth
                size="small"
                options={productsOptions}
                getOptionLabel={(option) => option.label}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Related Products" />
                )}
              />
            )}
          />
        </Grid>

        {/* Checkboxes */}
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          {["isInCampaign", "isActive", "isFeatured"].map((name) => (
            <Controller
              key={name}
              name={name}
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
                  label={name.replace("is", "Is ")}
                />
              )}
            />
          ))}
        </Grid>

        {/* Media */}
<Grid item size={{xs:12}}>
  <Controller
    name="media"
    control={control}
    defaultValue={[]}
    render={({ field }) => (
      <Stack spacing={1}>
        <Typography>Product Media</Typography>

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
            sx: { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 },
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

<Grid item size={{xs:12}}>
  <Controller
    name="catalogue"
    control={control}
    defaultValue={null}
    render={({ field }) => (
      <Stack spacing={1}>
        <Typography>Catalogue</Typography>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onClick={() => toggleMediaDrawer("catalogue", false)}
        >
          Select Catalogue
        </Button>

        {field.value && (
          <Box mt={1}>
            <Typography>{field.value.title || field.value.src}</Typography>
          </Box>
        )}

        {/* Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen && drawerType === "catalogue"}
          onClose={() => toggleMediaDrawer("catalogue", false)}
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
              onChange={(media) => {
                // ✅ Single file for catalogue
                field.onChange(media[0] || null);
                setDrawerOpen(false);
              }}
              isOnForm
              type="catalogue"
              multiple={false}
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
}
