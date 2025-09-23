"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import PageContainer from "../common/PageContainer";
import OrderForm from "../forms/OrderForm";
import { ORDERS_MOCK_DATA } from "@/constants/MOCK_DATA";

const CreateOrderPageWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const data = ORDERS_MOCK_DATA.find((order) => order.id === id)

  const handleCreateOrEditOrder = (order) => {
    if (id) {
      console.log("EDIT order", order);
    } else {
      console.log("CREATE order", order);
    }
  };

  return (
    <PageContainer
      title={id ? "Edit Order" : "Create New Order"}
      breadcrumbs={[
        { title: "Vinesh Shop" },
        { title: "Dashboard", path: "/dashboard" },
        { title: "Orders", path: "/dashboard/orders" },
        { title: id ? "Edit" : "Creation" },
      ]}
    >
      <OrderForm onSubmit={handleCreateOrEditOrder} data={data} />
    </PageContainer>
  );
};

export default CreateOrderPageWrapper;
