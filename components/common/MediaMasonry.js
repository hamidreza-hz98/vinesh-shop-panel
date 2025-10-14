"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { setFilePath } from "@/lib/media";
import { Button, IconButton, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: (theme.vars || theme).palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function MediaMasonry({
  media,
  onSelect,
  onDelete,
  type = "all",
  onTabChange,
  multiple = false,
}) {
  const [tab, setTab] = React.useState(type);
  const [selected, setSelected] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    onTabChange(newValue);
    setTab(newValue);
  };

  const isSelected = (item) =>
    selected.some((s) => (s.img || s.src) === (item.img || item.src));

  const handleSelectItem = (item) => {
    setSelected((prev) => {
      let newSelection;
      if (isSelected(item)) {
        newSelection = prev.filter(
          (s) => (s.img || s.src) !== (item.img || item.src)
        );
      } else {
        newSelection = multiple ? [...prev, item] : [item];
      }
      onSelect?.(newSelection);
      return newSelection;
    });
  };

  return (
    <Box sx={{ width: "100%", minHeight: 829 }}>
      {/* Tabs header */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" value="all" />
        <Tab label="Images" value="image" />
        <Tab label="Videos" value="video" />
        <Tab label="Audios" value="audio" />
        <Tab label="Catalogues" value="catalogue" />
        <Tab label="Icons" value="icon" />
      </Tabs>

      <Masonry
        sx={{ width: "100%" }}
        columns={{ xs: 2, sm: 3, md: 4 }}
        spacing={4}
      >
        {media?.map((item, index) => {
          const selectedState = isSelected(item);
          return (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                border: selectedState
                  ? "3px solid #1976d2"
                  : "3px solid transparent",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <Label>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2">
                    {item?.translations[0]?.title}
                  </Typography>

                  <CancelOutlinedIcon
                    color="error"
                    onClick={() => onDelete(item._id)}
                  />
                </Box>
              </Label>

              {item.type === "image" && (
                <Image
                  onClick={() => handleSelectItem(item)}
                  src={setFilePath(item.path)}
                  alt={item?.translations[0]?.title}
                  loading="lazy"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                  }}
                />
              )}
              {item.type === "video" && (
                <video
                  onClick={() => handleSelectItem(item)}
                  controls
                  width="100%"
                  crossOrigin="anonymous"
                >
                  <source src={setFilePath(item.path)} type={item.mimeType} />
                </video>
              )}
              {item.type === "audio" && (
                <audio
                  onClick={() => handleSelectItem(item)}
                  controls
                  style={{ width: "100%" }}
                  crossOrigin="anonymous"
                >
                  <source src={setFilePath(item.path)} type={item.mimeType} />
                </audio>
              )}
              {item.type === "catalogue" && (
                <iframe
                  onClick={() => handleSelectItem(item)}
                  src={setFilePath(item.path)}
                  style={{
                    width: "100%",
                    height: 300,
                    border: "none",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Masonry>
    </Box>
  );
}
