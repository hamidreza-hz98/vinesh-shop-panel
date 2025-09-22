"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const BrandsPageWrapper = dynamic(
  () => import('@/components/wrappers/BrandsPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const BrandsPage = () => {
  return (
    <BrandsPageWrapper />
  )
}

export default BrandsPage