"use client";

import { CATEGORIES_MOCK_DATA } from "@/constants/MOCK_DATA";
import { useSearchParams } from "next/navigation";
import React from "react";
import PageContainer from "../common/PageContainer";
import TabsForm from "../forms/TabsForm";
import CategoryGeneralForm from "../forms/category/CategoryGeneralForm";
import CategoryTranslationForm from "../forms/category/CategoryTranslationForm";

const CreateCategoryPageWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const data = id
    ? CATEGORIES_MOCK_DATA.find((category) => category.id === id) || {}
    : {};

  const handleCreateOrUpdateCategory = async (category) => {
    if (id) {
      console.log("Updating category:", category, id);
      // Update category logic
    } else {
      console.log("Creating category:", category);
      // Create category logic
    }
  };
  return (
    <PageContainer>
      <TabsForm
        GeneralForm={CategoryGeneralForm}
        TranslationForm={CategoryTranslationForm}
        data={data}
        // schema={categorySchema}
        onSave={handleCreateOrUpdateCategory}
      />
    </PageContainer>
  );
};

export default CreateCategoryPageWrapper;
