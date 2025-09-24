"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const TagsPageWrapper = dynamic(
  () => import('@/components/wrappers/TagsPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const TagsPage = () => {
  return (
    <TagsPageWrapper />
  )
}

export default TagsPage