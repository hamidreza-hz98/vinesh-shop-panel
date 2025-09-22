"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

export default function MediaMasonry({ onSelect, type = "all", multiple = false }) {
  const [tab, setTab] = React.useState(type);
  const [selected, setSelected] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredItems =
    tab === "all" ? itemData : itemData.filter((item) => item.type === tab);

  const isSelected = (item) =>
    selected.some((s) => (s.img || s.src) === (item.img || item.src));

  const handleSelectItem = (item) => {
    setSelected((prev) => {
      let newSelection;
      if (isSelected(item)) {
        newSelection = prev.filter((s) => (s.img || s.src) !== (item.img || item.src));
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
      </Tabs>

      <Masonry sx={{width: "100%"}} columns={{ xs: 2, sm: 3, md: 4 }} spacing={4}>
        {filteredItems.map((item, index) => {
          const selectedState = isSelected(item);
          return (
            <Box
              key={index}
              onClick={() => handleSelectItem(item)}
              sx={{
                cursor: "pointer",
                border: selectedState ? "3px solid #1976d2" : "3px solid transparent",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              <Label>{item.title}</Label>

              {item.type === "image" && (
                <Image
                  src={item.img}
                  alt={item.title}
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
                <video controls style={{ width: "100%" }}>
                  <source src={item.src} type="video/mp4" />
                </video>
              )}
              {item.type === "audio" && (
                <audio controls style={{ width: "100%" }}>
                  <source src={item.src} type="audio/mpeg" />
                </audio>
              )}
              {item.type === "catalogue" && (
                <iframe
                  src={item.src}
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

const itemData = [
  // --- Images ---
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea Star",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7",
    title: "Mountain",
  },
  {
    type: "image",
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },

  // --- Videos ---
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Sample Video",
  },
  {
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    title: "Flower Timelapse",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    title: "Bear Walk",
  },

  // --- Audios ---
  {
    type: "audio",
    src: "https://www.w3schools.com/html/horse.mp3",
    title: "Horse Audio",
  },
  {
    type: "audio",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "SoundHelix Song 1",
  },
  {
    type: "audio",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "SoundHelix Song 2",
  },

  // --- Catalogues (PDFs) ---
  {
    type: "catalogue",
    src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    title: "Dummy Catalogue",
  },
  {
    type: "catalogue",
    src: "https://gahp.net/wp-content/uploads/2017/09/sample.pdf",
    title: "Sample PDF",
  },
  {
    type: "catalogue",
    src: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    title: "Test PDF File",
  },
];

