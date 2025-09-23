import { CAMPAIGNS_MOCK_DATA } from '@/constants/MOCK_DATA';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import PageContainer from '../common/PageContainer';
import TabsForm from '../forms/TabsForm';
import CampaignGeneralForm from '../forms/campaign/CampaignGeneralForm';
import CampaignTranslationForm from '../forms/campaign/CampaignTranslationForm';

const CreateCampaignPageWrapper = () => {
  const searchParams = useSearchParams();
    const id = searchParams.get("id");
  
    const data = id
      ? CAMPAIGNS_MOCK_DATA.find((campaign) => campaign.id === id) || {}
      : {};
  
    const handleCreateOrUpdateCampaign = async (campaign) => {
      if (id) {
        console.log("Updating campaign:", campaign, id);
        // Update campaign logic
      } else {
        console.log("Creating campaign:", campaign);
        // Create campaign logic
      }
    };

  return (
   <PageContainer>
      <TabsForm
        GeneralForm={CampaignGeneralForm}
        TranslationForm={CampaignTranslationForm}
        data={data}
        // schema={campaignSchema}
        onSave={handleCreateOrUpdateCampaign}
      />
    </PageContainer>
  )
}

export default CreateCampaignPageWrapper