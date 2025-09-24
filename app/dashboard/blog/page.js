"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const BlogOverviewPageWrapper = dynamic(
  () => import("@/components/wrappers/BlogOverviewPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const BlogsPage = () => {
  return <BlogOverviewPageWrapper />;
};

export default BlogsPage;
