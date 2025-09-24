"use client"

import { TAGS_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { tagColumns } from '@/constants/columns';
import TagForm from '../forms/TagForm';

const TagsPageWrapper = () => {
  const getTags = async (params) => {
          console.log("Fetching tags with params:", params);
      
          return {
            items: TAGS_MOCK_DATA,
            rowCount: TAGS_MOCK_DATA.length,
          };
        };
      
        const deleteTag = async (id) => {
          console.log("Deleting tag with id:", id);
          return { success: true };
        };

  return (
    <div>
          <Overview
            title="Manage Tags"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Tags" },
            ]}
            columns={tagColumns}
            getMany={getTags}
            deleteOne={deleteTag}
            formMode='drawer'
            FormComponent={TagForm}
          />
        </div>
  )
}

export default TagsPageWrapper