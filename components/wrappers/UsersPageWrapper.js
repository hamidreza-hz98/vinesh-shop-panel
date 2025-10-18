"use client";

import React from "react";
import Overview from "../common/overview/Overview";
import { userColumns } from "@/constants/columns";
import UserForm from "../forms/UserForm";
import { transformGridQuery } from "@/lib/request";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers } from "@/store/user/user.action";
import QueryString from "qs";

const UsersPageWrapper = () => {
  const dispatch = useDispatch();

  const getUsers = async (params) => {
    const query = transformGridQuery(params);

    const data = await dispatch(
      getAllUsers(QueryString.stringify(query, { encodeValuesOnly: true }))
    ).unwrap();

    return { items: data.users, rowCount: data.total };
  };

  const handleDeleteUser = async (_id) => {
    const message = await dispatch(deleteUser(_id)).unwrap();

    return { success: true, message };
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
        deleteOne={handleDeleteUser}
        formMode="drawer"
        FormComponent={UserForm}
      />
    </div>
  );
};

export default UsersPageWrapper;
