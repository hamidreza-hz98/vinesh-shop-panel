import {
  createUserApi,
  getAllUsersApi,
  modifyUserApi,
  userDetailsApi,
} from "@/constants/api.routes";
import { fetchWithAuth } from "@/lib/fetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (body, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(createUserApi, {
        method: "POST",
        body,
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ _id, body }, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyUserApi(_id), {
        method: "PUT",
        body,
      });

      return message
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (query, { rejectWithValue }) => {
    try {
      const  { data }  = await fetchWithAuth(getAllUsersApi(query));
      
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (query, { rejectWithValue }) => {
    
    try {
      const { data } = await fetchWithAuth(userDetailsApi(query));

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_id, { rejectWithValue }) => {
    try {
      const { message } = await fetchWithAuth(modifyUserApi(_id), {
        method: "DELETE",
      });

      return message;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
