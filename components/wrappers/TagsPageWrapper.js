"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { tagColumns } from "@/constants/columns";
import TagForm from "../forms/TagForm";
import { useDispatch } from "react-redux";
import { transformGridQuery } from "@/lib/request";
import { deleteTag, getAlltags } from "@/store/tag/tag.action";
import QueryString from "qs";

const TagsPageWrapper = () => {
  const dispatch = useDispatch();

  const getTags = async (params) => {
    const query = transformGridQuery({ ...params });

    const data = await dispatch(
      getAlltags(QueryString.stringify(query))
    ).unwrap();
    return {
      items: data.tags,
      rowCount: data.total,
    };
  };

  const handleDeleteTag = async (_id) => {
    const message = await dispatch(deleteTag(_id)).unwrap();
    
    return { success: true, message };
  };

  return (
    <div>
      <Overview
        title="Manage Tags"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Tags" },
        ]}
        columns={tagColumns}
        getMany={getTags}
        deleteOne={handleDeleteTag}
        formMode="drawer"
        FormComponent={TagForm}
      />
    </div>
  );
};

export default TagsPageWrapper;
