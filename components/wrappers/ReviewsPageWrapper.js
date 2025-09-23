"use client";

import { REVIEWS_MOCK_DATA } from "@/constants/MOCK_DATA";
import React from "react";
import Overview from "../common/overview/Overview";
import { reviewColumns } from "@/constants/columns";
import ReviewForm from "../forms/ReviewForm";

const ReviewsPageWrapper = () => {
  const getReviews = async (params) => {
    console.log("Fetching carts with params:", params);

    return {
      items: REVIEWS_MOCK_DATA,
      rowCount: REVIEWS_MOCK_DATA.length,
    };
  };

  const handleDeleteReview = async (review) => {
    console.log("DELETE review", review);

    return {success: true}
  }
  return (
    <div>
      <Overview
        title="Reviews"
        breadcrumbs={[
          { title: "Vinesh Shop" },
          { title: "Dashboard", path: "/dashboard" },
          { title: "Reviews" },
        ]}
        columns={reviewColumns}
        getMany={getReviews}
        formMode="drawer"
        FormComponent={ReviewForm}
        deleteOne={handleDeleteReview}
      />
    </div>
  );
};

export default ReviewsPageWrapper;
