import Loader from "@/components/common/Loader";
import ProductsPageWrapper from "@/components/wrappers/ProductsPageWrapper";
import React from "react";

const ProductsPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <ProductsPageWrapper />
    </React.Suspense>
  );
};

export default ProductsPage;
