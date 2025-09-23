"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const ReviewsPageWrapper = dynamic(
  () => import("@/components/wrappers/ReviewsPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);
const ReviewsPage = () => {
  return <ReviewsPageWrapper />;
};

export default ReviewsPage;
