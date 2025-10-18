const { createSlice } = require("@reduxjs/toolkit");
const {
  createSize,
  updateSize,
  getAllSizes,
  deleteSize,
} = require("./size.action");

const initialState = {
  loading: false,
  sizes: [],
};

const sizeSlice = createSlice({
  name: "size",

  initialState,

  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(createSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSize.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSize.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSize.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSize.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllSizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })
      .addCase(getAllSizes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSize.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSize.rejected, (state) => {
        state.loading = false;
      }),
});
