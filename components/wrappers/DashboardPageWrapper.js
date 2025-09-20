"use client";

import * as React from "react";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import MainGrid from "./components/MainGrid";
import NavbarBreadcrumbs from "../common/NavbarBreadcrumbs";
import PrimarySerachField from "../Fields/PrimarySearchField";
import CustomDatePicker from "../Fields/CustomDatePicker";
import DashboardGrid from "../MainGrids/DashboardGrid";

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        flexGrow: 1,
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
          : alpha(theme.palette.background.default, 1),
        overflow: "auto",
      })}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          mx: 3,
          pb: 5,
          mt: { xs: 8, md: 0 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            display: { xs: "none", md: "flex" },
            width: "100%",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            maxWidth: { sm: "100%", md: "1700px" },
            pt: 1.5,
          }}
          spacing={2}
        >
          <NavbarBreadcrumbs />

          
          <Stack
            direction="row"
            sx={{
              gap: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <PrimarySerachField />

            <CustomDatePicker />

            {/* <MenuButton showBadge aria-label="Open notifications">
              <NotificationsRoundedIcon />
            </MenuButton> */}
            {/* <ColorModeIconDropdown /> */}
          </Stack>
        </Stack>

        <DashboardGrid />
      </Stack>
    </Box>
  );
}
