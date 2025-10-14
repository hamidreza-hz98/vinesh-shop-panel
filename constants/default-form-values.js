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

export const mediaDefaultValues = (data) => ({
  _id: data?._id || null,
  file:
    { path: data?.path, type: data?.type, mimeType: data?.mimeType } || null,
  type: data?.type || "image",
  translations: data?.translations || [
    {
      lang: "us",
      title: "",
      description: "",
      mediaAlt: "",
      mediaCaption: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    },
    {
      lang: "pt",
      title: "",
      description: "",
      mediaAlt: "",
      mediaCaption: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    },
    {
      lang: "ir",
      title: "",
      description: "",
      mediaAlt: "",
      mediaCaption: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
    },
  ],
});

export const orderDefaultValues = (data) => ({
  trackNumber:
    data?.trackNumber ||
    Math.floor(10000000 + Math.random() * 90000000).toString(),
  status: data?.status || "pending",
  orderType: data?.orderType || "online",
  address: data?.address || {},
  products: data?.products || [],
  shipmentPrice: data?.shipmentPrice || 0,
  transaction: data?.transaction || "",
  user: data?.user || "",
  price: data?.price || 0,
  discount: data?.discount || 0,
  finalCost: data?.finalCost || 0,
});

export const cartDefaultValues = (data) => ({
  id: data?.id || " - ",
  userName: data?.user?.firstName + " " + data?.user?.lastName || " - ",
  userEmail: data?.user?.email || " - ",
  userPhone: data?.user?.phoneNumber || " - ",
  products: data?.products?.map((p) => p.name).join(", ") || " - ",
  suggestedProducts:
    data?.suggestedProducts?.map((p) => p.name).join(", ") || " - ",
  coupon: data?.coupon?.code || " - ",
  price: data?.price ? `${data.price.amount} ${data.price.currency}` : " - ",
  discount: data?.discount
    ? `${data.discount.amount}${data.discount.currency}`
    : " - ",
  shipping: data?.shipping
    ? `${data.shipping.amount} ${data.shipping.currency}`
    : " - ",
  finalPrice: data?.finalPrice
    ? `${data.finalPrice.amount} ${data.finalPrice.currency}`
    : " - ",
});

export const couponDefaultValues = (data) => ({
  code: data?.code || " - ",
  type: data?.type || " - ",
  products: data?.products || [],
  users: data?.users || [],
  cart: data?.cart || {},
  percentage: data?.percentage || "",
  amount: data?.amount || {},
  expiry: data?.expiry || "",
  usageNumber: data?.usageNumber || 0,
});

export const transactionDefaultValues = (data) => ({
  userName: data?.user?.firstName + " " + data?.user?.lastName || " - ",
  userEmail: data?.user?.email || " - ",
  userPhone: data?.user?.phoneNumber || " - ",
  trackingCode: data?.trackingCode || " - ",
  referrerBank: data?.referrerBank || " - ",
  status: data?.status || " - ",
  createdAt: data?.createdAt || " - ",
  amount: data?.amount || " - ",
});

export const colorDefaultValues = (data) => ({
  code: data?.code || "#000000",
  translations: data?.translations || [
    {
      lang: "us",
      name: "",
    },
    {
      lang: "pt",
      name: "",
    },
    {
      lang: "ae",
      name: "",
    },
    {
      lang: "ir",
      name: "",
    },
  ],
});

export const tagDefaultValues = (data) => ({
  translations: data?.translations || [
    {
      lang: "us",
      name: "",
      slug: "",
    },
    {
      lang: "pt",
      name: "",
      slug: "",
    },
    {
      lang: "ae",
      name: "",
      slug: "",
    },
    {
      lang: "ir",
      name: "",
      slug: "",
    },
  ],
});

export const sizeDefaultValues = (data) => ({
  dimensions: data?.dimensions || { width: 0, height: 0, depth: 0, weight: 0 },
  translations: data?.translations || [
    {
      lang: "us",
      name: "",
      slug: "",
    },
    {
      lang: "pt",
      name: "",
      slug: "",
    },
    {
      lang: "ae",
      name: "",
      slug: "",
    },
    {
      lang: "ir",
      name: "",
      slug: "",
    },
  ],
});
