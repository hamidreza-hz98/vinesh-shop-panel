const { createSlice } = require("@reduxjs/toolkit");
const { loginAdmin } = require("./admin.action");

const initialState = {
  loading: false
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
    .addCase(loginAdmin.pending, state=> {
      state.loading = true
    })
    .addCase(loginAdmin.fulfilled, (state, action) => {
      state.loading = false
    })
    .addCase(loginAdmin.rejected, (state, action) => {
      state.loading = false
    })
  }
})

export default adminSlice.reducer;