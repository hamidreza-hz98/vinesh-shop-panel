"use client"

import { COLORS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { colorColumns } from '@/constants/columns';
import ColorForm from '../forms/ColorForm';

const ColorsPageWrapper = () => {
  const getColors = async (params) => {
        console.log("Fetching colors with params:", params);
    
        return {
          items: COLORS_MOCK_DATA,
          rowCount: COLORS_MOCK_DATA.length,
        };
      };
    
      const deleteColor = async (id) => {
        console.log("Deleting color with id:", id);
        return { success: true };
      };
      
  return (
    <div>
          <Overview
            title="Manage Colors"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Colors" },
            ]}
            columns={colorColumns}
            getMany={getColors}
            deleteOne={deleteColor}
            formMode='drawer'
            FormComponent={ColorForm}
          />
        </div>
  )
}

export default ColorsPageWrapper