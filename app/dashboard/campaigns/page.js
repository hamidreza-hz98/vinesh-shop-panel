"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const CampaignsOverviewPageWrapper = dynamic(
  () => import('@/components/wrappers/CampaignsOverviewPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CampaignsPage = () => {
  return (
    <CampaignsOverviewPageWrapper />
  )
}

export default CampaignsPage