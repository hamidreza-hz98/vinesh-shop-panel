import RichTextEditor from "@/components/Fields/RichTextEditor";
import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const CampaignTranslationForm = ({
  control,
  lang,
  setValue,
  watch,
}) => {
  const translations = watch("translations") || [];
  const translationIndex = translations.findIndex((t) => t.lang === lang);

  if (translationIndex === -1) {
    setValue("translations", [...translations, { lang }]);
  }

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
          <Typography my={2}>Campaign Descriptions</Typography>

          <Controller
            name={`translations.${translationIndex}.description`}
            control={control}
            defaultValue=""
            render={({ field }) => <RichTextEditor {...field} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignTranslationForm;
