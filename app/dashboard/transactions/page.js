"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const TransactionsOverviewPageWrapper = dynamic(
  () => import("@/components/wrappers/TransactionsOverviewPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const TransactionsPage = () => {
  return (
    <TransactionsOverviewPageWrapper />
  )
}

export default TransactionsPage