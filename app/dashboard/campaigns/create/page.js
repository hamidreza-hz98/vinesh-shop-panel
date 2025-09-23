"use client"

import Loader from '@/components/common/Loader'
import dynamic from 'next/dynamic';
import React from 'react'

const CreateCampaignPageWrapper = dynamic(
  () => import('@/components/wrappers/CreateCampaignPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CreateCampaignPage = () => {
  return (
    <CreateCampaignPageWrapper />
  )
}

export default CreateCampaignPage