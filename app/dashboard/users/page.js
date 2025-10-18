"use client"

import dynamic from 'next/dynamic';
import Loader from "@/components/common/Loader";

const UsersPageWrapper = dynamic(
  () => import('@/components/wrappers/UsersPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const UsersPage = () => {
  return (
      <UsersPageWrapper />
  );
};

export default UsersPage;
