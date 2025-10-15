import {
  createTagApi,
  getAllTagsApi,
  modifyTagApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTag = createAsyncThunk(
  "tag/createTag",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createTagApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async ({ _id, body }, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyTagApi(_id), {
        method: "PUT",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAlltags = createAsyncThunk(
  "tag/getAlltags",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllTagsApi(query));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyTagApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
