"use client";

import { CATEGORIES_MOCK_DATA } from "@/constants/MOCK_DATA";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import PageContainer from "../common/PageContainer";
import TabsForm from "../forms/TabsForm";
import CategoryGeneralForm from "../forms/category/CategoryGeneralForm";
import CategoryTranslationForm from "../forms/category/CategoryTranslationForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategoryDetails,
  updateCategory,
} from "@/store/category/category.action";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import QueryString from "qs";
import { selectCategory } from "@/store/category/category.selector";
import Loader from "../common/Loader";
import { purifyData } from "@/lib/request";

const CreateCategoryPageWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const dispatch = useDispatch();
  const categoryDetails = useSelector(selectCategory);

  const notifications = useNotifications();
  const router = useRouter();

  const loadData = React.useCallback(async () => {
    const query = { _id: id };
    await dispatch(getCategoryDetails(QueryString.stringify(query)));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (id) {
      loadData();
    }
  }, [loadData]);

  const handleCreateOrUpdateCategory = async (category) => {
    try {
      const body = purifyData(category, [
        "image",
        "icon",
        "tags",
        "translations.banners",
      ]);

      const message = id
        ? await dispatch(updateCategory({ _id: id, body })).unwrap()
        : await dispatch(createCategory(body)).unwrap();
        
        notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/categories");
    } catch (error) {
        console.log(error);
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (!categoryDetails) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <TabsForm
        GeneralForm={CategoryGeneralForm}
        TranslationForm={CategoryTranslationForm}
        data={categoryDetails}
        // schema={categorySchema}
        mode={id ? "edit" : "create"}
        onSave={handleCreateOrUpdateCategory}
      />
    </PageContainer>
  );
};

export default CreateCategoryPageWrapper;
