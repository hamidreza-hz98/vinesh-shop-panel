"use client";

import { BRANDS_MOCK_DATA } from "@/constants/MOCK_DATA";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import PageContainer from "../common/PageContainer";
import TabsForm from "../forms/TabsForm";
import BrandGeneralForm from "../forms/brand/BrandGeneralForm";
import BrandTranslationForm from "../forms/brand/BrandTranslationForm";
import { useDispatch, useSelector } from "react-redux";
import { selectBrand } from "@/store/brand/brand.selector";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import {
  createBrand,
  getBrandDetails,
  updateBrand,
} from "@/store/brand/brand.action";
import QueryString from "qs";
import Loader from "../common/Loader";
import { getAllCategories } from "@/store/category/category.action";
import { getAlltags } from "@/store/tag/tag.action";
import { purifyData } from "@/lib/request";

const CreateBrandPageWrapper = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const brandDetails = useSelector(selectBrand);
  const notifications = useNotifications();

  const _id = searchParams.get("id");

  const loadData = React.useCallback(async () => {
    if (_id) {
      const query = { _id };

      await dispatch(getBrandDetails(QueryString.stringify(query))).unwrap();
    }
  }, [dispatch, _id]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateOrUpdateBrand = async (brand) => {
    try {
      const body = purifyData(brand, ["categories", "tags", "image"]);

      const message = _id
        ? await dispatch(updateBrand({ _id, body })).unwrap()
        : await dispatch(createBrand(body)).unwrap();

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard/brands");
    } catch (error) {
      notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  if (!brandDetails) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <TabsForm
        GeneralForm={BrandGeneralForm}
        TranslationForm={BrandTranslationForm}
        data={brandDetails}
        // schema={categorySchema}
        onSave={handleCreateOrUpdateBrand}
      />
    </PageContainer>
  );
};

export default CreateBrandPageWrapper;
