"use client";

import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";
import React from "react";

const CreateBlogPageWrapper = dynamic(
  () => import("@/components/wrappers/CreateBlogPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CreateBlogPage = () => {
  return <CreateBlogPageWrapper />;
};

export default CreateBlogPage;
