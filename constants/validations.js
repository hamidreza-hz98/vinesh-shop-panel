import { brand } from "@/mui/palette/custom-colors";
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

export const adminSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").max(50),
  lastName: yup.string().required("Last name is required").max(50),
  username: yup.string().required("Username is required").max(50),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: yup.string().required("Role is required").max(50),
});

export const mediaSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(100),
  description: yup.string().required("Description is required").max(500),
  file: yup.mixed().required("File is required"),
  altText: yup.string().required("Alt text is required").max(100),
  isPublic: yup.boolean().required("Visibility is required"),
});

export const productSchema = yup.object().shape({
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
  categories: yup
    .array()
    .of(yup.string())
    .min(1, "At least one category is required"),
  tags: yup.array().of(yup.string()),
  brand: yup.string().max(50),
  relatedProducts: yup.array().of(yup.string()),
  isInCampaign: yup.boolean().required("Campaign status is required"),
  isActive: yup.boolean().required("Active status is required"),
  isFeatured: yup.boolean().required("Featured status is required"),
  media: yup
    .array()
    .of(yup.string())
    .min(1, "At least one media item is required"),
  catalogue: yup.object().shape({
    src: yup.string().required("Catalogue source is required"),
    altText: yup.string().required("Catalogue alt text is required").max(100),
  }),
  translations: yup.array().of(
    yup.object().shape({
      lang: yup.string().required("Language is required").max(10),
      name: yup.string().required("Name is required").max(100),
      description: yup.string().required("Description is required").max(500),
    })
  ),
});

export const orderSchema = yup.object().shape({
  trackNumber: yup
    .string()
    .required()
    .length(8, "Track number must be 8 digits"),
  status: yup.string().required("Status is required"),
  orderType: yup
    .string()
    .oneOf(["online", "telephone", "in-person"])
    .required("Order type is required"),
  address: yup.object().shape({
    name: yup.string().nullable(),
    recipient: yup.string().nullable(),
    address: yup.string().nullable(),
    zipCode: yup.string().nullable(),
    phone: yup.string().nullable(),
  }),
  products: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        price: yup.number().required().min(0),
        discount: yup.number().required().min(0),
        image: yup.string().nullable(),
        quantity: yup.number().required().min(1),
      })
    )
    .required(),
  shipmentPrice: yup.number().required().min(0),
  transaction: yup.string().nullable(),
  user: yup.string().nullable(),
  price: yup.number().required().min(0),
  discount: yup.number().required().min(0),
  finalCost: yup.number().required().min(0),
});

export const couponSchema = yup
  .object()
  .shape({
    code: yup.string().trim().required("Coupon code is required"),

    type: yup
      .string()
      .oneOf(["discount", "prize"], "Type must be discount or prize")
      .required("Coupon type is required"),

    products: yup.array().of(yup.mixed()),

    users: yup.array().of(yup.mixed()),

    cart: yup.object().nullable(),

    percentage: yup
      .number()
      .nullable()
      .min(0, "Percentage cannot be negative")
      .max(100, "Percentage cannot exceed 100"),

    amount: yup.number().nullable().min(0, "Amount cannot be negative"),

    expiry: yup.date().nullable().required("Expiry date is required"),

    usageNumber: yup
      .number()
      .required("Usage number is required")
      .min(1, "Usage number must be at least 1"),
  })
  .test(
    "percentage-or-amount",
    "Either percentage or amount is required",
    (value) => {
      return value?.percentage || value?.amount;
    }
  );

export const colorSchema = yup.object().shape({
  code: yup
    .string()
    .matches(
      /^#([0-9A-Fa-f]{6})$/,
      "Code must be a valid hex color (e.g. #FFFFFF)"
    )
    .required("Color code is required"),

  translations: yup
    .array()
    .of(
      yup.object().shape({
        lang: yup
          .string()
          .min(2, "Language code must have at least 2 characters")
          .max(5, "Language code can’t be longer than 5 characters")
          .required("Language is required"),
        name: yup.string().required("Translation name is required"),
      })
    )
    .min(1, "At least one translation is required"),
});

export const tagSchema = yup.object().shape({
  translations: yup
    .array()
    .of(
      yup.object().shape({
        lang: yup
          .string()
          .required("Language code is required")
          .min(2, "Language code must be at least 2 characters")
          .max(5, "Language code cannot exceed 5 characters"),
        name: yup
          .string()
          .required("Tag name is required")
          .min(1, "Tag name cannot be empty"),
        slug: yup
          .string()
          .required("Slug is required")
          .matches(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must be URL-friendly (lowercase letters, numbers, hyphens)"
          ),
      })
    )
    .min(1, "At least one translation is required")
    .required("Translations are required"),
});

export const sizeSchema = yup.object().shape({
  dimensions: yup.object().shape({
    width: yup.number().required("Width is required").min(0),
    height: yup.number().required("Height is required").min(0),
    depth: yup.number().required("Depth is required").min(0),
    weight: yup.number().required("Weight is required").min(0),
  }),

  translations: yup.array().of(
    yup.object().shape({
      lang: yup.string().required("Language is required"),
      name: yup.string().required("Name is required"),
    })
  ),
});