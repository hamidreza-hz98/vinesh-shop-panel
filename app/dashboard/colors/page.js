"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const ColorsPageWrapper = dynamic(
  () => import('@/components/wrappers/ColorsPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const ColorsPage = () => {
  return (
    <ColorsPageWrapper />
  )
}

export default ColorsPage