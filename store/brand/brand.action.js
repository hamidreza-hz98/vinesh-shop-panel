import {
  brandDetailsApi,
  createBrandApi,
  getAllBrandsApi,
  modifyBrandApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBrand = createAsyncThunk(
  "/brand/createBrand",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createBrandApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ( {_id, body} , { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyBrandApi(_id), {
        method: "PUT",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "brand/getAllBrands",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(getAllBrandsApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getBrandDetails = createAsyncThunk(
  "brand/getBrandDetails",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await fetchWithAuth(brandDetailsApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyBrandApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
