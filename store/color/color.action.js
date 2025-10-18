import {
  createColorApi,
  getAllColorsApi,
  modifyColorApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createColor = createAsyncThunk(
  "color/createColor",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createColorApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async ({ _id, body }, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyColorApi(_id), {
        method: "PUT",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAllColors = createAsyncThunk(
  "color/getAllColors",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllColorsApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyColorApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
