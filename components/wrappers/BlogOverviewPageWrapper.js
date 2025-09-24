"use client"

import { BLOG_MOCK_DATA } from '@/constants/MOCK_DATA';
import React from 'react'
import Overview from '../common/overview/Overview';
import { blogColumns } from '@/constants/columns';

const BlogOverviewPageWrapper = () => {
    const getBlogs = async (params) => {
      console.log("Fetching blogs with params:", params);
  
      return {
        items: BLOG_MOCK_DATA,
        rowCount: BLOG_MOCK_DATA.length,
      };
    };
  
    const deleteBlog = async (id) => {
      console.log("Deleting blog with id:", id);
      return { success: true };
    };

  return (
    <div>
          <Overview
            title="Manage Blog"
            breadcrumbs={[
              { title: "Vinesh Shop" },
              { title: "Dashboard", path: "/dashboard" },
              { title: "Blog" },
            ]}
            columns={blogColumns}
            getMany={getBlogs}
            deleteOne={deleteBlog}
          />
        </div>
  )
}

export default BlogOverviewPageWrapper