"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const CreateBrandPageWrapper = dynamic(
  () => import('@/components/wrappers/CreateBrandPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);
const CreateBrandPage = () => {
  return (
    <CreateBrandPageWrapper />
  )
}

export default CreateBrandPage