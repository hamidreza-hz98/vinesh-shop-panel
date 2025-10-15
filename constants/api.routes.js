export const adminLoginApi = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`;

export const uploadMediaApi = `${process.env.NEXT_PUBLIC_BASE_URL}/media/upload`;

export const getAllMediaApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/media/all?${query}`;

export const modifyMediaApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/media/${id}`;

export const createCategoryApi = `${process.env.NEXT_PUBLIC_BASE_URL}/category`;

export const categoryDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/category/details?${query}`;

export const modifyCategoryApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/category/${id}`;

export const getAllCategoriesApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/category/all?${query}`;

export const createTagApi = `${process.env.NEXT_PUBLIC_BASE_URL}/tag`;

export const modifyTagApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/tag/${id}`;

export const getAllTagsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/tag/all?${query}`;
