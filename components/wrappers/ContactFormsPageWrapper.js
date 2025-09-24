"use client"

import { CONTACT_FORMS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { contactFormColumns } from '@/constants/columns';
import ContactForm from '../forms/ContactForm';

const ContactFormsPageWrapper = () => {
    const getContactForms = async (params) => {
      console.log("Fetching contact forms with params:", params);
  
      return {
        items: CONTACT_FORMS_MOCK_DATA,
        rowCount: CONTACT_FORMS_MOCK_DATA.length,
      };
    };

  return (
    <div>
          <Overview
            title="Contact Forms"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Contact Forms" },
            ]}
            columns={contactFormColumns}
            getMany={getContactForms}
            rowActions={["details"]}
            formMode="drawer"
            FormComponent={ContactForm}
          />
        </div>
  )
}

export default ContactFormsPageWrapper