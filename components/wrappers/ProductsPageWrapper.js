"use client";

import React from 'react'
import Overview from '../common/overview/Overview';
import { productColumns } from '@/constants/columns';
import { PRODUCTS_MOCK_DATA } from '@/constants/MOCK_DATA';

const ProductsPageWrapper = () => {
    const getProducts = async (params) => {
      console.log("Fetching products with params:", params);

      return { items: PRODUCTS_MOCK_DATA, rowCount: PRODUCTS_MOCK_DATA.length };
    };

    const deleteProduct = async (id) => {
      console.log("Deleting product with id:", id);
      return { success: true };
    };

  return (
    <div>
      <Overview 
        title="Manage Products"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Products" },
        ]}
        columns={productColumns}
        getMany={getProducts}
        deleteOne={deleteProduct}
      />
    </div>
  )
}

export default ProductsPageWrapper