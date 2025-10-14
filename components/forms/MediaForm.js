"use client";

import { countries } from "@/constants/countries";
import { mediaDefaultValues } from "@/constants/default-form-values";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "../Fields/FileUpload";
import { useDispatch } from "react-redux";
import { updateMedia, uploadMedia } from "@/store/media/media.action";
import { parseCookies } from "nookies";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { setFilePath } from "@/lib/media";

const MediaForm = ({ mode, data, onClose, onSuccess }) => {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const dispatch = useDispatch();
  const notifications = useNotifications();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: mediaDefaultValues(data),
  });

  React.useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (data?.path) {
      setPreviewUrl(setFilePath(data?.path));
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile, data?.path]);

  React.useEffect(() => {
    reset(mediaDefaultValues(data));
  }, [mode, data, reset]);

  const onSubmit = async (formData) => {
    try {
      setUploadProgress(0);
      const { file, translations = [], ...rest } = formData;
      const formDataToSend = new FormData();

      if (file instanceof File) {
        formDataToSend.append("file", file);
      } else if (mode === "edit" && file?.url) {
        formDataToSend.append("existingFile", file.url); // or file._id
      } else {
        console.error("❌ Invalid file input");
        return;
      }

      // ✅ Append other fields (stringify if object/array)
      Object.entries(rest).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          formDataToSend.append(key, "");
        } else if (typeof value === "object") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // ✅ Append translations properly
      translations.forEach((t, index) => {
        Object.entries(t).forEach(([key, value]) => {
          formDataToSend.append(`translations[${index}][${key}]`, value ?? "");
        });
      });

      // ✅ Add uploader info
      const cookies = parseCookies();
      const _id = cookies._id;
      formDataToSend.append("uploadedBy", _id);
      formDataToSend.append("isPublic", "true");

      // ✅ Choose which API to call
      const apiAction =
        mode === "edit"
          ? updateMedia({
              _id: formData._id,
              formData: formDataToSend,
              onUploadProgress: (percent) => setUploadProgress(percent),
            })
          : uploadMedia({
              formData: formDataToSend,
              onUploadProgress: (percent) => setUploadProgress(percent),
            });

      const message = await dispatch(apiAction).unwrap();

      // ✅ Handle success
      setUploadProgress(100);
      onSuccess && onSuccess();
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);

      setTimeout(() => setUploadProgress(0), 800);

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
      setUploadProgress(0);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", mt: 2 }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileUpload
                {...field}
                onChange={(file) => {
                  field.onChange(file);
                  setSelectedFile(file);
                }}
              />
            )}
          />
        </Grid>

        {uploadProgress > 0 && (
          <Grid xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ height: 8, borderRadius: 2 }}
                />
              </Box>
              <Typography variant="body2" sx={{ minWidth: 45 }}>{`${Math.round(
                uploadProgress
              )}%`}</Typography>
            </Box>
          </Grid>
        )}

        {previewUrl && (
          <Grid xs={12}>
            <Box
              sx={{
                mt: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              {/* Image */}
              {(selectedFile?.type?.startsWith("image") ||
                data?.type === "image") && (
                <Image
                  src={previewUrl}
                  alt={data?.alt || "Preview"}
                  width={500}
                  height={300}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                />
              )}

              {/* Video */}
              {(selectedFile?.type?.startsWith("video") ||
                data?.type === "video") && (
                <video
                  src={previewUrl}
                  controls
                  style={{ width: "100%", maxHeight: 300, borderRadius: 8 }}
                />
              )}

              {/* Audio */}
              {(selectedFile?.type?.startsWith("audio") ||
                data?.type === "audio") && (
                <audio controls preload="metadata" style={{ width: "100%" }}>
                  <source
                    src={previewUrl}
                    type={selectedFile?.type || data?.mimeType}
                  />
                </audio>
              )}

              {/* Generic File */}
              {(selectedFile?.type?.startsWith("file") ||
                data?.type === "file") && (
                <Typography variant="body2">
                  📄 {selectedFile?.name || data?.name} (
                  {selectedFile
                    ? Math.round(selectedFile.size / 1024)
                    : "unknown"}{" "}
                  KB)
                </Typography>
              )}
            </Box>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField fullWidth {...field} select label="Media Type">
                <MenuItem value="image">image</MenuItem>
                <MenuItem value="video">video</MenuItem>
                <MenuItem value="audio">audio</MenuItem>
                <MenuItem value="icon">icon</MenuItem>
                <MenuItem value="file">file</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="translations"
            control={control}
            render={({ field }) => {
              const translations = field.value || [];

              const handleChange = (index, key, value) => {
                const updated = translations.map((item, i) =>
                  i === index ? { ...item, [key]: value } : item
                );
                field.onChange(updated);
              };

              const handleAddLanguage = (lang) => {
                if (!translations.find((t) => t.lang === lang.code)) {
                  const updated = [
                    ...translations,
                    {
                      lang: lang.code,
                      title: "",
                      description: "",
                      mediaAlt: "",
                      mediaCaption: "",
                      seoTitle: "",
                      seoDescription: "",
                      seoKeywords: [],
                    },
                  ];
                  field.onChange(updated);
                }
              };

              return (
                <>
                  {translations.map((t, index) => (
                    <Box
                      key={t.lang}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <h4>Translation ({t.lang.toUpperCase()})</h4>

                      <TextField
                        label="Title"
                        value={t.title}
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                        fullWidth
                        sx={{ mt: 1 }}
                      />

                      <TextField
                        label="Description"
                        value={t.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mt: 1 }}
                      />

                      <TextField
                        label="Media Alt"
                        value={t.mediaAlt}
                        onChange={(e) =>
                          handleChange(index, "mediaAlt", e.target.value)
                        }
                        fullWidth
                        sx={{ mt: 1 }}
                      />

                      <TextField
                        label="Media Caption"
                        value={t.mediaCaption}
                        onChange={(e) =>
                          handleChange(index, "mediaCaption", e.target.value)
                        }
                        fullWidth
                        sx={{ mt: 1 }}
                      />

                      <TextField
                        label="SEO Title"
                        value={t.seoTitle}
                        onChange={(e) =>
                          handleChange(index, "seoTitle", e.target.value)
                        }
                        fullWidth
                        sx={{ mt: 1 }}
                      />

                      <TextField
                        label="SEO Description"
                        value={t.seoDescription}
                        onChange={(e) =>
                          handleChange(index, "seoDescription", e.target.value)
                        }
                        fullWidth
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  ))}

                  {/* Add new language */}
                  <Autocomplete
                    sx={{ mt: 2 }}
                    fullWidth
                    options={countries}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, newValue) =>
                      newValue && handleAddLanguage(newValue)
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Image
                          src={option.flag}
                          alt={option.label}
                          width={20}
                          height={14}
                        />
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Add Language" />
                    )}
                    slotProps={{
                      popper: { sx: { zIndex: 8000 } },
                    }}
                  />
                </>
              );
            }}
          />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "Update" : "Upload"}
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaForm;
