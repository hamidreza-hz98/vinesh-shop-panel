"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const CreateOrderPageWrapper = dynamic(
  () => import('@/components/wrappers/CreateOrderPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const OrderDetailsPage = () => {
  return (
    <CreateOrderPageWrapper />
  )
}

export default OrderDetailsPage