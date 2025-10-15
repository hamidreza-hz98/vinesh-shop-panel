import {
  categoryDetailsApi,
  createCategoryApi,
  getAllCategoriesApi,
  modifyCategoryApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createCategoryApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",

  async ({ _id, body }, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyCategoryApi(_id), {
        method: "PUT",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllCategoriesApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getCategoryDetails = createAsyncThunk(
  "category/getCategoryDetails",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(categoryDetailsApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyCategoryApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
