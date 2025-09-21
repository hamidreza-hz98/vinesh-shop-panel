import Loader from "@/components/common/Loader";
import CreateProductPageWrapper from "@/components/wrappers/CreateProductPageWrapper";
import React from "react";

const CreateProductPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <CreateProductPageWrapper />
    </React.Suspense>
  );
};

export default CreateProductPage;
