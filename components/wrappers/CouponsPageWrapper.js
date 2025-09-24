"use client"

import { COUPONS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { couponColumns } from '@/constants/columns';
import CouponForm from '../forms/CouponForm';

const CouponsPageWrapper = () => {
    const getCoupons = async (params) => {
      console.log("Fetching coupons with params:", params);
  
      return {
        items: COUPONS_MOCK_DATA,
        rowCount: COUPONS_MOCK_DATA.length,
      };
    };
  
    const deleteCoupon = async (id) => {
      console.log("Deleting coupon with id:", id);
      return { success: true };
    };

  return (
     <div>
          <Overview
            title="Manage Coupons"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Coupons" },
            ]}
            columns={couponColumns}
            getMany={getCoupons}
            deleteOne={deleteCoupon}
            formMode='drawer'
            FormComponent={CouponForm}
          />
        </div>
  )
}

export default CouponsPageWrapper