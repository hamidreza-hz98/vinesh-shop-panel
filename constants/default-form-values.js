import dayjs from "dayjs";

export const userDefaultFormValues = (data) => ({
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  phoneNumber: data?.phoneNumber || "",
  email: data?.email || "",
  password: data?.password || "",
  shebaNumber: data?.shebaNumber || "",
  birthdate: data?.birthdate ? dayjs(data.birthdate) : null,
});

export const adminDefaultFormValues = (data) => ({
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  username: data?.username || "",
  password: data?.password || "",
  role: data?.role || "",
});

export const mediaDefaultFormValues = (data) => ({
  title: data?.title || "",
  description: data?.description || "",
  file: data?.file || null,
  altText: data?.altText || "",
  isPublic: data?.isPublic || false,
});