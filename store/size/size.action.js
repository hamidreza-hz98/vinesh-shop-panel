import {
  createSizeApi,
  getAllSizesApi,
  modifySizeApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSize = createAsyncThunk(
  "size/createSize",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createSizeApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.messge);
    }
  }
);

export const updateSize = createAsyncThunk(
  "size/updateSize",
  async ({ _id, body }, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifySizeApi(_id), {
        method: "PUT",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.messge);
    }
  }
);

export const getAllSizes = createAsyncThunk(
  "size/getAllSizes",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllSizesApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.messge);
    }
  }
);

export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifySizeApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      rejectWithValue(error.messge);
    }
  }
);
