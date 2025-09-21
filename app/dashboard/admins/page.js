import Loader from "@/components/common/Loader";
import AdminsPageWrapper from "@/components/wrappers/AdminsPageWrapper";
import React from "react";

const AdminsPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <AdminsPageWrapper />
    </React.Suspense>
  );
};

export default AdminsPage;
