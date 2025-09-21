import Loader from "@/components/common/Loader";
import UsersPageWrapper from "@/components/wrappers/UsersPageWrapper";
import React from "react";

const UsersPage = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <UsersPageWrapper />
    </React.Suspense>
  );
};

export default UsersPage;
