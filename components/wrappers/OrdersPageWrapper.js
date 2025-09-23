"use client";

import { ORDERS_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { orderColumns } from "@/constants/columns";

const OrdersPageWrapper = () => {
  const getOrders = async (params) => {
    console.log("Fetching orders with params:", params);

    return {
      items: ORDERS_MOCK_DATA,
      rowCount: ORDERS_MOCK_DATA.length,
    };
  };

  const deleteOrder = async (id) => {
    console.log("Deleting order with id:", id);
    return { success: true };
  };

  return (
    <div>
      <Overview
        title="Manage Orders"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Orders" },
        ]}
        columns={orderColumns}
        getMany={getOrders}
        deleteOne={deleteOrder}
      />
    </div>
  );
};

export default OrdersPageWrapper;
