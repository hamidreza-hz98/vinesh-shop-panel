/* eslint-disable @next/next/no-img-element */
import { Box, Chip, Rating, Typography } from "@mui/material";
import {
  campaignStatuses,
  couponStatuses,
  orderStatuses,
  reviewStatuses,
  transactionStatuses,
} from "./general";
import {
  calculateCampaignExpiryStatus,
  calculateCampaignRemainingDays,
  calculateCouponStatus,
} from "@/lib/date";

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
    valueGetter: (subCategories) => subCategories?.join(" | ") || "",
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

export const brandColumns = [
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
    field: "categories",
    headerName: "Categories",
    width: 150,
    valueGetter: (subCategories) => subCategories?.join(" | ") || "",
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

export const orderColumns = [
  {
    field: "trackNumber",
    headerName: "Track Number",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const status = params.row.status || "";

      return (
        <Chip
          label={orderStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={orderStatuses[status].color}
          icon={orderStatuses[status].icon}
        />
      );
    },
  },
  {
    field: "user",
    headerName: "User",
    width: 180,
  },
  {
    field: "submitDate",
    headerName: "SubmitDate",
    width: 150,
    valueGetter: (submitDate) => new Date(submitDate)?.toLocaleString() || "",
  },
  {
    field: "finalCost",
    headerName: "Final Cost",
    width: 180,
    valueGetter: (finalCost) => finalCost?.amount + finalCost?.currency || "",
  },
];

export const cartColumns = [
  {
    field: "user",
    headerName: "User",
    width: 200,
    valueGetter: (user) => user?.phoneNumber,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    valueGetter: (price) => price?.amount + price?.currency,
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 150,
    valueGetter: (discount) =>
      discount?.amount +
      (discount?.type === "percentage" ? "%" : discount?.currency),
  },
  {
    field: "shipping",
    headerName: "Shipping",
    width: 150,
    valueGetter: (shipping) => shipping?.amount + shipping?.currency,
  },
  {
    field: "finalPrice",
    headerName: "Final Price",
    width: 150,
    valueGetter: (finalPrice) => finalPrice?.amount + finalPrice?.currency,
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

export const reviewColumns = [
  {
    field: "user",
    headerName: "User",
    width: 200,
    valueGetter: (user) => user?.phoneNumber,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const status = params.row.status || "";

      return (
        <Chip
          label={reviewStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={reviewStatuses[status].color}
          icon={reviewStatuses[status].icon}
        />
      );
    },
  },
  {
    field: "entity",
    headerName: "Entity",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "media",
    headerName: "Images",
    width: 150,
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
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.title}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ))}
        </Box>
      );
    },
  },
  {
    field: "rate",
    headerName: "Rate",
    width: 150,
    renderCell: (params) => {
      const rate = params.row.rate;

      return <Rating size="small" value={rate} readOnly />;
    },
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

export const campaignColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 120,
  },
  {
    field: "expiry",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const startDate = params?.row?.startDate || "";
      const expiryDate = params?.row?.expiry || "";
      const status = calculateCampaignExpiryStatus(startDate, expiryDate);

      return (
        <Chip
          label={campaignStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={campaignStatuses[status].color}
          icon={campaignStatuses[status].icon}
        />
      );
    },
  },
  {
    field: "startDate",
    headerName: "Day",
    width: 150,
    renderCell: (params) => {
      const startDate = params?.row?.startDate || "";
      const expiryDate = params?.row?.expiry || "";
      const remainingDays = calculateCampaignRemainingDays(
        startDate,
        expiryDate
      );

      return remainingDays;
    },
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

export const couponColumns = [
  {
    field: "code",
    headerName: "Code",
    width: 100,
  },

  {
    field: "expiry",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const expiry = params.row.expiry;
      const usageNumber = params.row.usageNumber;
      const used = params.row.used;
      const status = calculateCouponStatus(expiry, usageNumber, used);

      return (
        <Chip
          label={couponStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={couponStatuses[status].color}
          icon={couponStatuses[status].icon}
        />
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    renderCell: (params) => {
      const percentage = params.row.percentage;
      const amount = params.row.amount;

      return percentage ? percentage + "%" : amount.amount + amount.currency;
    },
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

export const transactionColumns = [
  {
    field: "trackingCode",
    headerName: "Tracking Code",
    width: 120,
  },
  {
    field: "user",
    headerName: "User",
    width: 120,
    valueGetter: (user) => user.phoneNumber,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 80,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      const status = params.row.status

       return (
        <Chip
          label={transactionStatuses[status].name}
          variant="filled"
          size="small"
          sx={{ border: "none" }}
          color={transactionStatuses[status].color}
          icon={transactionStatuses[status].icon}
        />
      );
    }
  },
  {
    field: "referrerBank",
    headerName: "Referrer Bank",
    width: 120,
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
