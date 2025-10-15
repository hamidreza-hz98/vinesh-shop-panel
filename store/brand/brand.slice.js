import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandDetails,
  updateBrand,
} from "./brand.action";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  brands: [],
  brand: {},
};

const brandSlice = createSlice({
  name: "brand",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBrand.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBrand.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBrandDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.brand = action.payload;
      })
      .addCase(getBrandDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default brandSlice.reducer;
