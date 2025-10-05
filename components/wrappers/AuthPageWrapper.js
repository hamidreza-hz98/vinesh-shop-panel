"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import ForgotPassword from "../ForgotPassword";
import { loginAdmin } from "@/store/admin/admin.action";
import { loginSchema } from "@/constants/validations";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";
import { selectLoading } from "@/store/admin/admin.selector";
import ButtonLoader from "../common/ButtonLoader";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: { maxWidth: "450px" },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
}));

const AuthPageWrapper = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const notifications = useNotifications();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [openForgot, setOpenForgot] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const message = await dispatch(loginAdmin(data)).unwrap();

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard");
    } catch (error) {
      notifications.show(error || "Login failed", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const handleOpenForgot = () => setOpenForgot(true);
  const handleCloseForgot = () => setOpenForgot(false);

  return (
    <SignInContainer direction="column">
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Username */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.username}
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Username"
                  placeholder="Enter your username"
                />
              </FormControl>
            )}
          />
          {errors.username && (
            <Typography color="error">{errors.username.message}</Typography>
          )}

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.password}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  {...field}
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          />
          {errors.password && (
            <Typography color="error">{errors.password.message}</Typography>
          )}

          {/* Remember Me */}
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Remember me"
              />
            )}
          />

          {/* Forgot Password */}
          <ForgotPassword open={openForgot} handleClose={handleCloseForgot} />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? <ButtonLoader /> : "Sign In"}
          </Button>

          <Button
            variant="text"
            onClick={handleOpenForgot}
            sx={{ alignSelf: "center" }}
          >
            Forgot your password?
          </Button>
        </Box>
      </Card>
    </SignInContainer>
  );
};

export default AuthPageWrapper;
