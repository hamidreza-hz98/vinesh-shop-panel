"use client";

import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const ContactForm = ({ mode, data, onClose, onSuccess }) => {
  const isEdit = mode === "edit";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: data,
  });

  React.useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = async (formData) => {
    console.log("Cart submitted:", formData);
    onSuccess && onSuccess();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="text" onClick={onClose}>
          <CancelOutlinedIcon />
        </Button>
      </Box>

      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              size="small"
              disabled={isEdit}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              size="small"
              fullWidth
              disabled={isEdit}
              InputProps={{
                endAdornment:
                  isEdit && data?.email ? (
                    <InputAdornment position="end">
                      <Link
                        href={`mailto:${data.email}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" size="small">
                          Email Respond
                        </Button>
                      </Link>
                    </InputAdornment>
                  ) : null,
              }}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              fullWidth
              size="small"
              disabled={isEdit}
              InputProps={{
                endAdornment:
                  isEdit && data?.phone ? (
                    <InputAdornment position="end">
                      <Link
                        href={`tel:${data.phone}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained" size="small">
                          Call Respond
                        </Button>
                      </Link>
                    </InputAdornment>
                  ) : null,
              }}
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              size="small"
              fullWidth
              multiline
              disabled={isEdit}
            />
          )}
        />

        <Button fullWidth variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;
