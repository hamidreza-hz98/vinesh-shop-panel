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