"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { Grid, Rating } from "@mui/material";
import Link from "next/link";
import { formatDateAndTime } from "@/lib/date";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function ReviewForm({ data, onClose, onSuccess }) {
  const [status, setStatus] = React.useState(data?.status || "pending");
  const [rejectionReason, setRejectionReason] = React.useState(
    data?.status === "rejected" ? data.rejectionReason || "" : ""
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { reply: "" },
  });

  React.useEffect(() => {
    reset({ reply: "" });
    setStatus(data?.status || "pending");
    if (data?.status === "rejected") {
      setRejectionReason(data.rejectionReason || "");
    } else {
      setRejectionReason("");
    }
  }, [data, reset]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const onSubmitReply = async (formData) => {
    console.log("Reply submitted:", formData.reply);
    onSuccess &&
      onSuccess({ reply: formData.reply, status, rejectionReason });
    reset({ reply: "" });
  };

  if (!data) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid
          size={{ xs: 12 }}
          display="flex"
          alignItems="start"
          justifyContent="space-between"
        >
          <Typography variant="h6" mb={2}>
            Review Details
          </Typography>

          <Button variant="text" onClick={onClose}>
            <CancelOutlinedIcon />
          </Button>
        </Grid>

        <Grid
          size={{ xs: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Typography variant="subtitle1">
              {data.user.firstName + " " + data.user.lastName}
            </Typography>
            <Typography variant="subtitle2">{data.user.phoneNumber}</Typography>
          </Stack>

          <Link href={`tel:${data.user.phoneNumber}`}>
            <Button variant="contained" size="small">
              Call to User
            </Button>
          </Link>
        </Grid>

        <Grid mt={1} size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight="bold">
            Title: {data.title}
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Rating readOnly value={data.rate} size="small" />

          <Typography variant="subtitle2">
            date: {formatDateAndTime(data.createdAt)}
          </Typography>
        </Grid>

        <Grid mt={1} size={{ xs: 12 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {data.text}
          </Typography>
        </Grid>

        {data.media && data.media.length !== 0 && (
          <Grid
            mt={1}
            size={{ xs: 12 }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            {data.media.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.title}
                width={64}
                height={64}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            ))}
          </Grid>
        )}

        {data.replies && data.replies.length !== 0 && (
          <Stack width="100%" mt={1} spacing={1}>
            <Typography variant="h6">Replies:</Typography>

            {data.replies.map((reply, index) => (
              <Box
                key={index}
                sx={{
                  border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                  px: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  {reply.user.firstName + " " + reply.user.lastName}:
                </Typography>

                <Typography variant="subtitle2">{reply.text}</Typography>

                <Typography variant="subtitle1" fontSize={14}>
                  {formatDateAndTime(reply.createdAt)}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        {/* Actions */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" mt={2}>
            Actions:
          </Typography>

          <Stack direction="row" spacing={2} mt={1}>
            <Button
              variant={status === "accepted" ? "contained" : "outlined"}
              color="success"
              onClick={() => handleStatusChange("accepted")}
            >
              {status === "accepted" ? "Accepted" : "Accept"}
            </Button>

            <Button
              variant={status === "rejected" ? "contained" : "outlined"}
              color="error"
              onClick={() => handleStatusChange("rejected")}
            >
              {status === "rejected" ? "Rejected" : "Reject"}
            </Button>
          </Stack>
        </Grid>

        {/* Rejection Reason (only when rejected) */}
        {status === "rejected" && (
          <Grid size={{ xs: 12 }} mt={1}>
            <TextField
              label="Rejection Reason"
              fullWidth
              multiline
              minRows={1}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </Grid>
        )}

        {/* Reply */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="reply"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reply"
                fullWidth
                multiline
                minRows={1}
              />
            )}
          />
        </Grid>

        <Grid
          size={{ xs: 12 }}
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmitReply)}
          >
            Submit Reply
          </Button>

          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
