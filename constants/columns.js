/* eslint-disable @next/next/no-img-element */
import { Box } from "@mui/material";

export const userColumns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "phoneNumber", headerName: "Phone", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "birthdate", headerName: "Birthdate", width: 200 },
  { field: "createdAt", headerName: "Created At", width: 180 },
  { field: "updatedAt", headerName: "Updated At", width: 180 },
];

export const adminColumns = [
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "username", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 100 },
  { field: "createdAt", headerName: "Created At", width: 180 },
  { field: "updatedAt", headerName: "Updated At", width: 180 },
];

export const productColumns = [
  {
    field: "media",
    headerName: "Media",
    width: 120,
    renderCell: (params) => {
      const images = params.row.media || [];
      return (
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <img
            src={images[0].src}
            alt={images[0].title}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    valueGetter: (price) => price?.amount + price?.currency || "",
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 150,
    valueGetter: (categories) =>
      categories?.map((c) => c.name)?.join(", ") || "",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
    valueGetter: (brand) => brand?.name || "",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    valueGetter: (createdAt) => new Date(createdAt)?.toLocaleString() || "",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 180,
    valueGetter: (updatedAt) => new Date(updatedAt)?.toLocaleString() || "",
  },
];

export const categoryColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 120,
    renderCell: (params) => {
      const image = params.row.image || {};

      return (
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <img
            src={image.src}
            alt={image.title}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "subCategories",
    headerName: "Sub Categories",
    width: 150,
    valueGetter: (subCategories) => subCategories?.join(" | ") || ""
  },
  {
    field: "excerpt",
    headerName: "Excerpt",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    valueGetter: (createdAt) => new Date(createdAt)?.toLocaleString() || "",
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 180,
    valueGetter: (updatedAt) => new Date(updatedAt)?.toLocaleString() || "",
  },
];
