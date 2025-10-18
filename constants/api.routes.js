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

export const createBrandApi = `${process.env.NEXT_PUBLIC_BASE_URL}/brand`;

export const brandDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/brand/details?${query}`;

export const modifyBrandApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/brand/${id}`;

export const getAllBrandsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/brand/all?${query}`;

export const createTagApi = `${process.env.NEXT_PUBLIC_BASE_URL}/tag`;

export const modifyTagApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/tag/${id}`;

export const getAllTagsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/tag/all?${query}`;

export const createColorApi = `${process.env.NEXT_PUBLIC_BASE_URL}/color`;

export const modifyColorApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/color/${id}`;

export const getAllColorsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/color/all?${query}`;

export const createSizeApi = `${process.env.NEXT_PUBLIC_BASE_URL}/size`;

export const modifySizeApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/size/${id}`;

export const getAllSizesApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/size/all?${query}`;

export const createUserApi = `${process.env.NEXT_PUBLIC_BASE_URL}/user`;

export const modifyUserApi = (id) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`;

export const getAllUsersApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/user/all?${query}`;


export const userDetailsApi = (query) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/user/details?${query}`;