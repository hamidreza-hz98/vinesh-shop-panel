export const selectLoading = (state) => state?.category?.loading;
export const selectCategory = (state) => state?.category?.category;
export const selectCategories = (state) => state?.category?.categories || [];
