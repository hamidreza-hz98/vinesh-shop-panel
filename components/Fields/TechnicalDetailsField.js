import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Button, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const TechnicalDetailsField = ({
  value = {},
  onChange,
  lang,
  watchForm,
  setValue,
}) => {
  const [details, setDetails] = useState(
    Object.entries(value).length > 0
      ? Object.entries(value).map(([k, v]) => ({ key: k, value: v }))
      : [{ key: "", value: "" }]
  );

  // Sync with external value
  useEffect(() => {
    setDetails(
      Object.entries(value).length > 0
        ? Object.entries(value).map(([k, v]) => ({ key: k, value: v }))
        : [{ key: "", value: "" }]
    );
  }, [value]);

  const emitChange = (updated) => {
    const obj = {};
    updated.forEach((item) => {
      // allow empty keys while editing
      if (item.key.trim() !== "") {
        obj[item.key] = item.value;
      }
    });
    onChange?.(obj);
  };

  const handleChange = (index, field, val) => {
    const updated = details.map((item, i) =>
      i === index ? { ...item, [field]: val } : item
    );
    setDetails(updated);
    emitChange(updated);
  };

  const handleAdd = () => {
    const updated = [...details, { key: "", value: "" }];
    setDetails(updated);
    // don’t emit here, wait until user types
  };

  const handleRemove = (index) => {
    const removedKey = details[index].key.trim();

    // Remove from current language state
    const updated = details.filter((_, i) => i !== index);
    setDetails(updated);
    emitChange(updated);

    if (!removedKey) return;

    // Remove from all translations
    const translations = watchForm("translations") || [];
    const updatedTranslations = translations.map((t) => {
      if (!t.technicalDetails) return t;
      const newTech = { ...t.technicalDetails };
      delete newTech[removedKey];
      return { ...t, technicalDetails: newTech };
    });

    setValue("translations", updatedTranslations);
  };

  const handleKeyBlur = (index) => {
    const newKey = details[index].key.trim();
    if (!newKey) return;

    const translations = watchForm("translations") || [];

    const updatedTranslations = translations.map((t) => {
      const tech = t.technicalDetails || {};
      if (!(newKey in tech)) {
        return {
          ...t,
          technicalDetails: { ...tech, [newKey]: "" },
        };
      }
      return t;
    });

    setValue("translations", updatedTranslations);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {details.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item size={{xs:5}}>
              <TextField
                label="Key"
                value={item.key}
                onChange={(e) => handleChange(index, "key", e.target.value)}
                onBlur={() => handleKeyBlur(index)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item size={{xs:6}}>
              <TextField
                label="Value"
                value={item.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item size={{xs:1}} sx={{ display: "flex", alignItems: "center" }}>
              {details.length > 1 && (
                <IconButton color="error" onClick={() => handleRemove(index)}>
                  <Delete />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button variant="outlined" startIcon={<Add />} onClick={handleAdd}>
          Add New
        </Button>
      </Box>
    </Box>
  );
};

export default TechnicalDetailsField;
