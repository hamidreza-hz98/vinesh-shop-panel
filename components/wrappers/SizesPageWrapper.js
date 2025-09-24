"use client";

import { SIZES_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { sizeColumns } from "@/constants/columns";
import SizeForm from "../forms/SizeForm";

const SizesPageWrapper = () => {
  const getSizes = async (params) => {
    console.log("Fetching sizes with params:", params);

    return {
      items: SIZES_MOCK_DATA,
      rowCount: SIZES_MOCK_DATA.length,
    };
  };

  const deleteSize = async (id) => {
    console.log("Deleting size with id:", id);
    return { success: true };
  };

  return (
    <div>
      <Overview
        title="Manage Sizes"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Sizes" },
        ]}
        columns={sizeColumns}
        getMany={getSizes}
        deleteOne={deleteSize}
        formMode="drawer"
        FormComponent={SizeForm}
      />
    </div>
  );
};

export default SizesPageWrapper;
