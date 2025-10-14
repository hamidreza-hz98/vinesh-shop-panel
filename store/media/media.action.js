import {
  modifyMediaApi,
  getAllMediaApi,
  uploadMediaApi,
} from "@/constants/api.routes";
import api from "@/lib/axios";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const uploadMedia = createAsyncThunk(
  "/media/uploadMedia",
  async ({ formData, onUploadProgress }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(uploadMediaApi, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (onUploadProgress) onUploadProgress(percentCompleted);
          }
        },
      });

      return data.message;
    } catch (error) {
      return rejectWithValue(message);
    }
  }
);

export const updateMedia = createAsyncThunk(
  "/media/updateMedia",
  async ({ _id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(modifyMediaApi(_id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllMedia = createAsyncThunk(
  "/media/getAllMedia",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllMediaApi(query), {
        method: "GET",
        query,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  "/media/deleteMedia",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyMediaApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
