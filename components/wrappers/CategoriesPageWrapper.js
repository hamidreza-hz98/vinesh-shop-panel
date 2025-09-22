"use client"

import React from "react";
import Overview from "../common/overview/Overview";
import { categoryColumns } from "@/constants/columns";
import { CATEGORIES_MOCK_DATA } from "@/constants/MOCK_DATA";

const CategoriesPageWrapper = () => {
  const getCategories = async (params) => {
    console.log("Fetching categories with params:", params);

    return {
      items: CATEGORIES_MOCK_DATA,
      rowCount: CATEGORIES_MOCK_DATA.length,
    };
  };

  const deleteCategory = async (id) => {
    console.log("Deleting category with id:", id);
    return { success: true };
  };

  return (
    <div>
      <Overview
        title="Manage Categories"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Categories" },
        ]}
        columns={categoryColumns}
        getMany={getCategories}
        deleteOne={deleteCategory}
      />
    </div>
  );
};

export default CategoriesPageWrapper;
