"use client";

import { CARTS_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { cartColumns } from "@/constants/columns";
import CartForm from "../forms/CartForm";

const CartsPageWrapper = () => {
  const getCarts = async (params) => {
    console.log("Fetching carts with params:", params);

    return {
      items: CARTS_MOCK_DATA,
      rowCount: CARTS_MOCK_DATA.length,
    };
  };

  return (
    <div>
      <Overview
        title="Carts"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Carts" },
        ]}
        columns={cartColumns}
        getMany={getCarts}
        formMode="drawer"
        rowActions={["details"]}
        FormComponent={CartForm}
      />
    </div>
  );
};

export default CartsPageWrapper;
