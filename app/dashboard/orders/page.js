"use client"

import dynamic from 'next/dynamic';
import Loader from '@/components/common/Loader';

const OrdersPageWrapper = dynamic(
  () => import('@/components/wrappers/OrdersPageWrapper'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const OrdersPage = () => {
  return (
    <OrdersPageWrapper />
  )
}

export default OrdersPage