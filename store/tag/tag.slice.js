const { createSlice } = require("@reduxjs/toolkit");
const { createTag, updateTag, getAlltags, deleteTag } = require("./tag.action");

const initialState = {
  tags: [],
  loading: false,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTag.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTag.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAlltags.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlltags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getAlltags.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTag.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default tagSlice.reducer