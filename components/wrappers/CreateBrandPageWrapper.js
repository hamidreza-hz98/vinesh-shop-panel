"use client"

import { BRANDS_MOCK_DATA } from '@/constants/MOCK_DATA';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import PageContainer from '../common/PageContainer';
import TabsForm from '../forms/TabsForm';
import BrandGeneralForm from '../forms/brand/BrandGeneralForm';
import BrandTranslationForm from '../forms/brand/BrandTranslationForm';

const CreateBrandPageWrapper = () => {
  const searchParams = useSearchParams();
    const id = searchParams.get("id");
  
    const data = id
      ? BRANDS_MOCK_DATA.find((brand) => brand.id === id) || {}
      : {};
  
    const handleCreateOrUpdateBrand = async (brand) => {
      if (id) {
        console.log("Updating brand:", brand, id);
        // Update brand logic
      } else {
        console.log("Creating brand:", brand);
        // Create brand logic
      }
    };

  return (
     <PageContainer>
      <TabsForm
        GeneralForm={BrandGeneralForm}
        TranslationForm={BrandTranslationForm}
        data={data}
        // schema={categorySchema}
        onSave={handleCreateOrUpdateBrand}
      />
    </PageContainer>
  )
}

export default CreateBrandPageWrapper