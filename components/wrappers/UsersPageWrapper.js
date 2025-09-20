"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { userColumns } from "@/constants/columns";
import { USERS_MOCK_DATA } from "@/constants/MOCK_DATA";
import UserForm from "../forms/UserForm";

const UsersPageWrapper = () => {
  const getUsers = async (params) => {
    console.log("Fetching users with params:", params);
    return { items: USERS_MOCK_DATA, rowCount: USERS_MOCK_DATA.length };
  };

  const deleteUser = async (id) => {
    console.log("Deleting user with id:", id);
    return { success: true };
  };

  return (
    <div>
      <Overview
        title="Manage Users"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Users" },
        ]}
        columns={userColumns}
        getMany={getUsers}
        deleteOne={deleteUser}
        formMode="drawer"
        FormComponent={UserForm}
      />
    </div>
  );
};

export default UsersPageWrapper;
