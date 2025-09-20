"use client"

import { ADMINS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import AdminForm from '../forms/AdminForm';
import { adminColumns } from '@/constants/columns';

const AdminsPageWrapper = () => {
    const getAdmins = async (params) => {
      console.log("Fetching admins with params:", params);
      return { items: ADMINS_MOCK_DATA, rowCount: ADMINS_MOCK_DATA.length };
    };

    const deleteAdmin = async (id) => {
      console.log("Deleting admin with id:", id);
      return { success: true };
    };

  return (
     <div>
          <Overview
            title="Manage Admins"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Admins" },
            ]}
            columns={adminColumns}
            getMany={getAdmins}
            deleteOne={deleteAdmin}
            formMode="drawer"
            FormComponent={AdminForm}
          />
        </div>
  )
}

export default AdminsPageWrapper