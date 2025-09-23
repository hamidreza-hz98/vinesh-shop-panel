import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PermDataSettingOutlinedIcon from "@mui/icons-material/PermDataSettingOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";

export const sidebarRoutes = [
  {
    header: "Main",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: DashboardOutlinedIcon,
        href: "/dashboard",
      },
      {
        id: "users",
        title: "Users",
        icon: SupervisedUserCircleOutlinedIcon,
        href: "/dashboard/users",
      },
      {
        id: "admins",
        title: "Admins",
        icon: Person2OutlinedIcon,
        href: "/dashboard/admins",
      },
      {
        id: "media",
        title: "Media",
        icon: PermMediaOutlinedIcon,
        href: "/dashboard/media",
      },
      {
        id: "products",
        title: "Products",
        icon: Inventory2OutlinedIcon,
        href: "/dashboard/products",
        nested: [
          {
            id: "allProducts",
            title: "All Products",
            href: "/dashboard/products",
          },
          {
            id: "createProduct",
            title: "Create Product",
            href: "/dashboard/products/create",
          },
        ],
      },
      {
        id: "categories",
        title: "Categories",
        icon: CategoryOutlinedIcon,
        href: "/dashboard/categories",
        nested: [
          {
            id: "allCategories",
            title: "All Categories",
            href: "/dashboard/categories",
          },
          {
            id: "createCategory",
            title: "Create Category",
            href: "/dashboard/categories/create",
          },
        ],
      },
      {
        id: "brands",
        title: "Brands",
        icon: LayersOutlinedIcon,
        href: "/dashboard/brands",
        nested: [
          {
            id: "allBrands",
            title: "All Brands",
            href: "/dashboard/brands",
          },
          {
            id: "createBrand",
            title: "Create Brand",
            href: "/dashboard/brands/create",
          },
        ],
      },
      {
        id: "orders",
        title: "Orders",
        icon: ShoppingCartCheckoutOutlinedIcon,
        href: "/dashboard/orders",
      },
      {
        id: "cart",
        title: "Cart",
        icon: ShoppingBasketOutlinedIcon,
        href: "/dashboard/cart",
      },
      {
        id: "reviews",
        title: "Reviews",
        icon: RateReviewOutlinedIcon,
        href: "/dashboard/reviews",
      },
    ],
  },
  {
    header: "Settings",
    items: [
      {
        id: "generalSettings",
        title: "General Settings",
        icon: PermDataSettingOutlinedIcon,
        href: "/dashboard/general-settings",
      },
      {
        id: "campaigns",
        title: "Campaigns",
        icon: CampaignOutlinedIcon,
        href: "/dashboard/campaigns",
      },
      {
        id: "coupons",
        title: "Coupons",
        icon: LocalOfferOutlinedIcon,
        href: "/dashboard/coupons",
      },
      {
        id: "transactions",
        title: "Transactions",
        icon: ReceiptOutlinedIcon,
        href: "/dashboard/transactions",
      },
      {
        id: "contactForms",
        title: "Contact Forms",
        icon: AttachEmailOutlinedIcon,
        href: "/dashboard/contact-forms",
      },
    ],
  },
  {
    header: "Blog",
    items: [
      {
        id: "blog",
        title: "Blog",
        icon: DescriptionOutlinedIcon,
        href: "/dashboard/blog",
        nested: [
          {
            id: "allBlogs",
            title: "All Blogs",
            href: "/dashboard/blog",
          },
          {
            id: "createBlog",
            title: "Create Blog",
            href: "/dashboard/blog/create",
          },
        ],
      },
    ],
  },
];

export const orderStatuses = {
  pending: {
    name: "Pending",
    color: "text",
    icon: <RestoreOutlinedIcon />,
  },
  processing: {
    name: "Processing",
    color: "primary",
    icon: <HourglassBottomOutlinedIcon />,
  },
  shipping: {
    name: "Shipping",
    color: "warning",
    icon: <RocketLaunchOutlinedIcon />,
  },
  delivered: {
    name: "Delivered",
    color: "success",
    icon: <CheckCircleOutlineOutlinedIcon />,
  },
  canceled: {
    name: "Canceled",
    color: "error",
    icon: <CancelOutlinedIcon />,
  },
  failed: {
    name: "Failed",
    color: "error",
    icon: <CreditCardOffOutlinedIcon />,
  },
};

export default sidebarRoutes;
