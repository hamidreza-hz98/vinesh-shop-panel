const { createSlice } = require("@reduxjs/toolkit");
const {
  createCategory,
  getAllCategories,
  getCategoryDetails,
  deleteCategory,
  updateCategory,
} = require("./category.action");

const initialState = {
  categories: [],
  loading: false,
  category: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategoryDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer