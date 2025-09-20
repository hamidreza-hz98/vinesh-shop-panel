import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").max(50),
  lastName: yup.string().required("Last name is required").max(50),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  shebaNumber: yup
    .string()
    .required("Sheba number is required")
    .matches(/^IR\d{24}$/, "Enter a valid Iranian Sheba number"),
  birthdate: yup.date().required("Birth date is required"),
});