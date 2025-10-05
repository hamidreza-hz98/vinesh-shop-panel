import { adminLoginApi } from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

export const loginAdmin = createAsyncThunk(
  "/admin/loginAdmin",
  async (body, { rejectWithValue }) => {
    try {
      const { message, data } = await fetchWithAuth(adminLoginApi, {
        method: "POST",
        body,
      });

      setCookie(null, "token", data.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      setCookie(null, "_id", data.admin._id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      setCookie(null, "role", data.admin.role, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });

      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
