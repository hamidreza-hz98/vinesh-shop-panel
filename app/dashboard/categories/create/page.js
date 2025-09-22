"use client"

import Loader from '@/components/common/Loader'
import dynamic from 'next/dynamic';
import React from 'react'

const CreateCategoryPageWrapper = dynamic(
  () => import('@/components/wrappers/CreateCategoryPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const CreateCategoryPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
    <CreateCategoryPageWrapper />
    </React.Suspense>
  )
}

export default CreateCategoryPage