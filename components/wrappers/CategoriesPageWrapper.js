"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { categoryColumns } from "@/constants/columns";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "@/store/category/category.action";
import { transformGridQuery } from "@/lib/request";
import qs from "qs";

const CategoriesPageWrapper = () => {
  const dispatch = useDispatch();

  const getCategories = async (params) => {
    const query = transformGridQuery({ lang: "us", ...params });

    const data = await dispatch(
      getAllCategories(qs.stringify(query, { encodedValuesOnly: true }))
    ).unwrap();

    return {
      items: data.categories,
      rowCount: data.total,
    };
  };

  const handleDeleteCategory = async (_id) => {
    const message = await dispatch(deleteCategory(_id)).unwrap();

    return { success: true, message };
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
        deleteOne={handleDeleteCategory}
      />
    </div>
  );
};

export default CategoriesPageWrapper;
