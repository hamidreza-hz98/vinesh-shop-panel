import { deleteMedia, getAllMedia, updateMedia, uploadMedia } from "./media.action";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  media: [],
};

const mediaSlice = createSlice({
  name: "media",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedia.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMedia.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.media = action.payload;
      })
      .addCase(getAllMedia.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.media = action.payload;
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default mediaSlice.reducer;
