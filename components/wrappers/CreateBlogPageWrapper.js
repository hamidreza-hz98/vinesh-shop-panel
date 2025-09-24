"use client"

import { BLOG_MOCK_DATA } from '@/constants/MOCK_DATA';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import PageContainer from '../common/PageContainer';
import TabsForm from '../forms/TabsForm';
import BlogGeneralForm from '../forms/blog/BlogGeneralForm';
import BlogTranslationForm from '../forms/blog/BlogTranslationForm';

const CreateBlogPageWrapper = () => {
  const searchParams = useSearchParams();
    const id = searchParams.get("id");
  
    const data = id
      ? BLOG_MOCK_DATA.find((blog) => blog.id === id) || {}
      : {};
  
    const handleCreateOrUpdateBlog = async (blog) => {
      if (id) {
        console.log("Updating blog:", blog, id);
        // Update blog logic
      } else {
        console.log("Creating blog:", blog);
        // Create blog logic
      }
    };

  return (
   <PageContainer>
      <TabsForm
        GeneralForm={BlogGeneralForm}
        TranslationForm={BlogTranslationForm}
        data={data}
        // schema={blogSchema}
        onSave={handleCreateOrUpdateBlog}
      />
    </PageContainer>
  )
}

export default CreateBlogPageWrapper