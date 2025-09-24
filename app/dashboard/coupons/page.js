"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const CouponsPageWrapper = dynamic(
  () => import('@/components/wrappers/CouponsPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);
const CouponsPage = () => {
  return (
    <CouponsPageWrapper />
  )
}

export default CouponsPage