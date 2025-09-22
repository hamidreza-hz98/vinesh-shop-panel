"use client";

import React from "react";
import MediaMasonry from "../common/MediaMasonry";
import PageContainer from "../common/PageContainer";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import MediaForm from "../forms/MediaForm";
import { useTheme } from "@mui/material/styles";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const MediaPageWrapper = ({
  isOnForm = false,
  type = "all",
  multiple = false,
  onSelect,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState("create");
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedMedia, setSelectedMedia] = React.useState(null);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
  };

  const handleSuccess = React.useCallback(() => {
    notifications.show("Operation successful.", {
      severity: "success",
      autoHideDuration: 3000,
    });

    handleDrawerClose();
  }, []);

  const handleCreateClick = () => {
    setDrawerMode("create");
    setSelectedRow(null);
    setDrawerOpen(true);
  };

  const handleRowEdit = (row) => {
    if (isOnForm) {
      setSelectedMedia(row);
    } else {
      setDrawerMode("edit");
      setSelectedRow(row);
      setDrawerOpen(true);
    }
  };

  const handleSelectMedia = () => {
    onSelect(selectedMedia);    
  };

  const handleRefresh = () => {
    // Handle the refresh button click
    console.log("Refresh button clicked");
  };

  return (
    <PageContainer
      breadcrumbs={[{ name: "Media", path: "/media" }]}
      title="Media"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip
            title="Reload data"
            placement="top"
            enterDelay={1000}
            PopperProps={{
              sx: { zIndex: (theme) => theme.zIndex.modal + 2001 },
            }}
          >
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>

          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Upload New
          </Button>

          {isOnForm && (
            <Button
              variant="contained"
              color="success"
              disabled={!selectedMedia}
              onClick={handleSelectMedia}
              startIcon={<DoneOutlinedIcon />}
            >
              Upload New
            </Button>
          )}
        </Stack>
      }
    >
      <MediaMasonry
        type={type}
        onSelect={(row) => handleRowEdit(row)}
        multiple={multiple}
      />

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
          sx: {
            zIndex: (theme) => theme.zIndex.modal + 1000,
          },
        }}
        PaperProps={{
          sx: {
            position: "fixed",
            zIndex: (theme) => theme.zIndex.modal + 1000,
            ...(isMobile
              ? { width: "100vw", height: "100vh", maxWidth: "100vw", top: 0 }
              : { width: 400, maxWidth: "100vw", top: 0 }),
          },
        }}
      >
        <Box sx={{ p: 2, height: "100%" }}>
          <MediaForm
            mode={drawerMode}
            data={drawerMode === "edit" ? selectedRow : null}
            onClose={handleDrawerClose}
            onSuccess={handleSuccess}
          />
        </Box>
      </Drawer>
    </PageContainer>
  );
};

export default MediaPageWrapper;
