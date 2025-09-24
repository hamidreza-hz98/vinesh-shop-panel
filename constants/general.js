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
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import HourglassDisabledOutlinedIcon from "@mui/icons-material/HourglassDisabledOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";

export const sidebarRoutes = [
  {
    header: "Main Pages",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: DashboardOutlinedIcon,
        href: "/dashboard",
      },
      {
        id: "products",
        title: "Products",
        icon: Inventory2OutlinedIcon,
        href: "/dashboard/products",
      },
      {
        id: "categories",
        title: "Categories",
        icon: CategoryOutlinedIcon,
        href: "/dashboard/categories",
      },
      {
        id: "users",
        title: "Users",
        icon: SupervisedUserCircleOutlinedIcon,
        href: "/dashboard/users",
      },
      {
        id: "blog",
        title: "Blog",
        icon: DescriptionOutlinedIcon,
        href: "/dashboard/blog",
      },
    ],
  },
  {
    header: "General",
    items: [
      {
        id: "media",
        title: "Media",
        icon: PermMediaOutlinedIcon,
        href: "/dashboard/media",
      },
      {
        id: "brands",
        title: "Brands",
        icon: LayersOutlinedIcon,
        href: "/dashboard/brands",
      },
      {
        id: "colors",
        title: "Colors",
        icon: ColorLensOutlinedIcon,
        href: "/dashboard/colors",
      },
      {
        id: "tags",
        title: "Tags",
        icon: TagOutlinedIcon,
        href: "/dashboard/tags",
      },
      {
        id: "sizes",
        title: "Sizes",
        icon: HeightOutlinedIcon,
        href: "/dashboard/sizes",
      },
    ],
  },
  {
    header: "Marketting",
    items: [
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
    ],
  },
  {
    header: "Financial",
    items: [
      {
        id: "orders",
        title: "Orders",
        icon: ShoppingCartCheckoutOutlinedIcon,
        href: "/dashboard/orders",
      },
      {
        id: "transactions",
        title: "Transactions",
        icon: ReceiptOutlinedIcon,
        href: "/dashboard/transactions",
      },
      // {
      //   id: "paymentGateways",
      //   title: "Payment Gateways",
      //   icon: AccountBalanceOutlinedIcon,
      //   href: "/dashboard/payment-gateways",
      // },
      {
        id: "carts",
        title: "Carts",
        icon: ShoppingBasketOutlinedIcon,
        href: "/dashboard/carts",
      },
    ],
  },
  {
    header: "Settings",
    items: [
      {
        id: "admins",
        title: "Admins",
        icon: Person2OutlinedIcon,
        href: "/dashboard/admins",
      },
      {
        id: "generalSettings",
        title: "General Settings",
        icon: PermDataSettingOutlinedIcon,
        href: "/dashboard/general-settings",
      },
      {
        id: "contactForms",
        title: "Contact Forms",
        icon: AttachEmailOutlinedIcon,
        href: "/dashboard/contact-forms",
      },
      {
        id: "reviews",
        title: "Reviews",
        icon: RateReviewOutlinedIcon,
        href: "/dashboard/reviews",
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

export const reviewStatuses = {
  pending: {
    name: "Pending",
    color: "text",
    icon: <RestoreOutlinedIcon />,
  },

  accepted: {
    name: "Accepted",
    color: "success",
    icon: <CheckCircleOutlineOutlinedIcon />,
  },
  rejected: {
    name: "Rejected",
    color: "error",
    icon: <CancelOutlinedIcon />,
  },
};

export const campaignStatuses = {
  running: {
    name: "Running",
    color: "success",
    icon: <CheckCircleOutlineOutlinedIcon />,
  },

  notStarted: {
    name: "Not Started",
    color: "text",
    icon: <HourglassDisabledOutlinedIcon />,
  },
  finished: {
    name: "Finished",
    color: "error",
    icon: <UpdateOutlinedIcon />,
  },
};

export const couponStatuses = {
  active: {
    name: "Active",
    color: "success",
    icon: <UpdateOutlinedIcon />,
  },

  expired: {
    name: "Expired",
    color: "text",
    icon: <HourglassDisabledOutlinedIcon />,
  },
  used: {
    name: "Used",
    color: "error",
    icon: <UpdateOutlinedIcon />,
  },
};

export const transactionStatuses = {
  successful: {
    name: "Successful",
    color: "success",
    icon: <UpdateOutlinedIcon />,
  },
  failed: {
    name: "Failed",
    color: "error",
    icon: <UpdateOutlinedIcon />,
  },
};

export const contactFormStatuses = {
  responded: {
    name: "responded",
    color: "warning",
    icon: <UpdateOutlinedIcon />,
  },
  new: {
    name: "New",
    color: "success",
    icon: <NotificationAddOutlinedIcon />,
  },
};

export default sidebarRoutes;
