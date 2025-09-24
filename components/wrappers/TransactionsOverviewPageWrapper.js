"use client"

import { TRANSACTIONS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { transactionColumns } from '@/constants/columns';
import TransactionForm from '../forms/TransactionForm';

const TransactionsOverviewPageWrapper = () => {
    const getTransactions = async (params) => {
      console.log("Fetching transactions with params:", params);
  
      return {
        items: TRANSACTIONS_MOCK_DATA,
        rowCount: TRANSACTIONS_MOCK_DATA.length,
      };
    };
  
  return (
     <div>
          <Overview
            title="Transactions"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Transactions" },
            ]}
            columns={transactionColumns}
            getMany={getTransactions}
            formMode="drawer"
            rowActions={["details"]}
            FormComponent={TransactionForm}
          />
        </div>
  )
}

export default TransactionsOverviewPageWrapper