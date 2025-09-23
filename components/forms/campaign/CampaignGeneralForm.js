"use client";

import CustomDatePicker from "@/components/Fields/CustomDatePicker";
import { Box, Button, Drawer, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";
import ProductField from "@/components/Fields/ProductField";
import { PRODUCTS_MOCK_DATA } from "@/constants/MOCK_DATA";

const CampaignGeneralForm = ({ control, setValue }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);

  const products = PRODUCTS_MOCK_DATA;

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
            name="startDate"
            control={control}
            render={({ field }) => <CustomDatePicker {...field} />}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="expiry"
            control={control}
            render={({ field }) => <CustomDatePicker {...field} />}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">Products</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          {/* Products */}
          <ProductField
            control={control}
            name="products"
            productsOptions={products}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Controller
            name="banners"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Stack spacing={1}>
                <Typography>Campaign Banners</Typography>

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
                      onSelect={(media) => {
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
      </Grid>
    </Box>
  );
};

export default CampaignGeneralForm;
