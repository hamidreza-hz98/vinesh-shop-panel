"use client";

import { SIZES_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { sizeColumns } from "@/constants/columns";
import SizeForm from "../forms/SizeForm";
import { useDispatch } from "react-redux";
import { transformGridQuery } from "@/lib/request";
import { deleteSize, getAllSizes } from "@/store/size/size.action";
import QueryString from "qs";

const SizesPageWrapper = () => {
  const dispatch = useDispatch();

  const getSizes = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllSizes(QueryString.stringify(query, { encodeValuesOnly: true }))
    ).unwrap();

    return {
      items: data.sizes,
      rowCount: data.total,
    };
  };

  const handleDeleteSize = async (_id) => {
    const message = await dispatch(deleteSize(_id)).unwrap();

    return { success: true, message };
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
        deleteOne={handleDeleteSize}
        formMode="drawer"
        FormComponent={SizeForm}
      />
    </div>
  );
};

export default SizesPageWrapper;
