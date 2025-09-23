"use client"

import { CAMPAIGNS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { campaignColumns } from '@/constants/columns';

const CampaignsOverviewPageWrapper = () => {
    const getCampaigns = async (params) => {
      console.log("Fetching campaigns with params:", params);
  
      return {
        items: CAMPAIGNS_MOCK_DATA,
        rowCount: CAMPAIGNS_MOCK_DATA.length,
      };
    };
  
    const deleteCampaign = async (id) => {
      console.log("Deleting campaign with id:", id);
      return { success: true };
    };

  return (
       <div>
         <Overview
           title="Manage Campaigns"
           breadcrumbs={[
             { title: "Vinesh Shop" },
             { title: "Dashboard", path: "/dashboard" },
             { title: "Campaigns" },
           ]}
           columns={campaignColumns}
           getMany={getCampaigns}
           deleteOne={deleteCampaign}
         />
       </div>
  )
}

export default CampaignsOverviewPageWrapper