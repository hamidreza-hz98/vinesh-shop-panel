"use client";

import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Autocomplete,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { countries } from "@/constants/countries";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function TabsForm({
  GeneralForm,
  TranslationForm,
  data,
  mode,
  schema,
  onSave,
}) {
  const fixedTabs = ["general", "us", "pt", "ae", "ir"];

  const [tabs, setTabs] = useState([
    { type: "general" },
    { type: "translation", lang: "us", currency: "$" },
    { type: "translation", lang: "pt", currency: "€" },
    { type: "translation", lang: "ae", currency: "UAD" },
    { type: "translation", lang: "ir", currency: "ريال" },
    { type: "add" },
  ]);

  const [currentTab, setCurrentTab] = useState(0);
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const fixedLangs = [
    { lang: "us", currency: "$" },
    { lang: "pt", currency: "€" },
    { lang: "ae", currency: "UAD" },
    { lang: "ir", currency: "ريال" },
  ];

  const defaultTranslations = data?.translations || [];
  fixedLangs.forEach((fl) => {
    if (!defaultTranslations.find((t) => t.lang === fl.lang)) {
      defaultTranslations.push({ lang: fl.lang });
    }
  });

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: { ...data, translations: defaultTranslations },
    resolver: schema || undefined,
  });

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const watchForm = watch();

  const handleAddLanguage = (lang) => {
    setShowAutocomplete(false);
    if (!tabs.find((t) => t.lang === lang.code)) {
      const newTabs = [
        ...tabs.filter((t) => t.type !== "add"),
        { type: "translation", lang: lang.code, currency: lang.currency },
        { type: "add" },
      ];
      setTabs(newTabs);
      setCurrentTab(newTabs.length - 2);

      const translations = watchForm.translations || [];

      const existingTech =
        translations.find(
          (t) =>
            t.technicalDetails && Object.keys(t.technicalDetails).length > 0
        )?.technicalDetails || {};

      const newTranslation = {
        lang: lang.code,
        technicalDetails: { ...existingTech },
      };

      const newTranslations = [...translations, newTranslation];
      setValue("translations", newTranslations);
    }
  };

  const handleRemoveLanguage = (langCode) => {
    const newTabs = tabs.filter((t) => t.lang !== langCode);
    setTabs(newTabs);
    setCurrentTab(0);

    const newTranslations = (watchForm.translations || []).filter(
      (t) => t.lang !== langCode
    );
    setValue("translations", newTranslations);
  };

  const getTranslationData = (lang) => {
    if(!data || !watchForm) return
    if (!Array.isArray(watchForm.translations)) return {};

    return watchForm.translations.find((t) => t.lang === lang) || {};
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSave)}>
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => {
          if (tab.type === "general")
            return <Tab key="general" label="General" />;

          if (tab.type === "translation") {
            const lang = countries.find((l) => l.code === tab.lang);
            const isFixed = fixedTabs.includes(tab.lang);

            return (
              <Tab
                key={tab.lang}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Image
                      src={lang?.flag || "/images/flags/default.svg"}
                      alt={lang?.label || tab.lang}
                      width={20}
                      height={14}
                      style={{ borderRadius: 2, objectFit: "cover" }}
                    />
                    <Typography>
                      {lang?.label || tab.lang.toUpperCase()}
                    </Typography>
                    {!isFixed && (
                      <Button
                        size="16px"
                        color="error"
                        variant="outlined"
                        sx={{
                          width: 16,
                          minWidth: 16,
                          height: 16,
                          minHeight: 16,
                          padding: 1,
                          borderRadius: 2,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveLanguage(tab.lang);
                        }}
                      >
                        <CloseIcon fontSize="12px" />
                      </Button>
                    )}
                  </Box>
                }
              />
            );
          }

          if (tab.type === "add") {
            return (
              <Tab
                key="add"
                label="+"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAutocomplete(true);
                }}
              />
            );
          }

          return null;
        })}
      </Tabs>

      {showAutocomplete && (
        <Autocomplete
          sx={{ mt: 2, width: 300 }}
          options={countries.filter(
            (lang) => !tabs.some((t) => t.lang === lang.code)
          )}
          getOptionLabel={(option) => option.label}
          onChange={(e, newValue) => newValue && handleAddLanguage(newValue)}
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
        />
      )}

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={currentTab} index={index}>
          {tab.type === "general" && (
            <GeneralForm
              control={control}
              setValue={setValue}
              mode={mode}
              data={watchForm}
            />
          )}

          {tab.type === "translation" && (
            <TranslationForm
              control={control}
              setValue={setValue}
              watch={watch}
              lang={tab.lang}
              currency={tab.currency}
              mode={mode}
              data={getTranslationData(tab.lang)}
            />
          )}
        </TabPanel>
      ))}

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
}
