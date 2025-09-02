"use client"

import { Box } from "@mui/material";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {children}
    </Box>
  );
};

export default DashboardLayout;
