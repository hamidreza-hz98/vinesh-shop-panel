"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const PaymentGatewaysPageWrapper = dynamic(
  () => import("@/components/wrappers/PaymentGatewaysPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const PaymentGatewaysPage = () => {
  return (
    <PaymentGatewaysPageWrapper />
  )
}

export default PaymentGatewaysPage