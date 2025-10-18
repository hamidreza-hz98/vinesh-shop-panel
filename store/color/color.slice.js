import {
  createColor,
  deleteColor,
  getAllColors,
  updateColor,
} from "./color.action";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  colors: [],
};

const colorSlice = createSlice({
  name: "color",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(createColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createColor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createColor.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateColor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateColor.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteColor.rejected, (state) => {
        state.loading = false;
      }),
});

export default colorSlice.reducer;
