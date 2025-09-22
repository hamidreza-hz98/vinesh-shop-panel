"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const CategoriesPageWrapper = dynamic(
  () => import('@/components/wrappers/CategoriesPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export default function CategoriesPage() {
  return <CategoriesPageWrapper />;
}