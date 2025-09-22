"use client";

import React from "react";
import PageContainer from "../common/PageContainer";
import TabsForm from "../forms/TabsForm";
import ProductGeneralForm from "../forms/product/ProductGeneralForm";
import { useSearchParams } from "next/navigation";
import { PRODUCTS_MOCK_DATA } from "@/constants/MOCK_DATA";
import { productSchema } from "@/constants/validations";
import ProductTranslationForm from "../forms/product/ProductTranslationForm";

const CreateProductPageWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const data = id
    ? PRODUCTS_MOCK_DATA.find((product) => product.id === id) || {}
    : {};

  const handleCreateOrUpdateProduct = async (product) => {
    if (id) {
      console.log("Updating product:", product, id);
      // Update product logic
    } else {
      console.log("Creating product:", product);
      // Create product logic
    }
  };

  return (
    <PageContainer>
      <TabsForm
        GeneralForm={ProductGeneralForm}
        TranslationForm={ProductTranslationForm}
        data={data}
        // schema={productSchema}
        onSave={handleCreateOrUpdateProduct}
      />
    </PageContainer>
  );
};

export default CreateProductPageWrapper;
