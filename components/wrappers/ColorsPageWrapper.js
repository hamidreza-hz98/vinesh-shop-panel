"use client";

import { COLORS_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { colorColumns } from "@/constants/columns";
import ColorForm from "../forms/ColorForm";
import { useDispatch } from "react-redux";
import { transformGridQuery } from "@/lib/request";
import { deleteColor, getAllColors } from "@/store/color/color.action";
import QueryString from "qs";

const ColorsPageWrapper = () => {
  const dispatch = useDispatch();

  const getColors = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAllColors(QueryString.stringify(query, { encodedValueOnly: true }))
    ).unwrap();

    return {
      items: data.colors,
      rowCount: data.total,
    };
  };

  const handleDeleteColor = async (_id) => {
    const message = await dispatch(deleteColor(_id)).unwrap();

    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="Manage Colors"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Colors" },
        ]}
        columns={colorColumns}
        getMany={getColors}
        deleteOne={handleDeleteColor}
        formMode="drawer"
        FormComponent={ColorForm}
      />
    </div>
  );
};

export default ColorsPageWrapper;
