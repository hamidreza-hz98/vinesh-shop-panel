"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const CartsPageWrapper = dynamic(
  () => import("@/components/wrappers/CartsPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CartsPage = () => {
  return <CartsPageWrapper />;
};

export default CartsPage;
