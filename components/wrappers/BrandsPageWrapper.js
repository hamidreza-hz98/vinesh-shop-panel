"use client"

import { BRANDS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { brandColumns } from '@/constants/columns';

const BrandsPageWrapper = () => {
 const getBrands = async (params) => {
     console.log("Fetching brands with params:", params);
 
     return {
       items: BRANDS_MOCK_DATA,
       rowCount: BRANDS_MOCK_DATA.length,
     };
   };
 
   const deleteBrand = async (id) => {
     console.log("Deleting brand with id:", id);
     return { success: true };
   };
 
   return (
     <div>
       <Overview
         title="Manage Brands"
         breadcrumbs={[
           { title: "Vinesh Shop" },
           { title: "Dashboard", path: "/dashboard" },
           { title: "Brands" },
         ]}
         columns={brandColumns}
         getMany={getBrands}
         deleteOne={deleteBrand}
       />
     </div>
   );
}

export default BrandsPageWrapper