"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const SizesPageWrapper = dynamic(
  () => import("@/components/wrappers/SizesPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const SizesPage = () => {
  return <SizesPageWrapper />;
};

export default SizesPage;
