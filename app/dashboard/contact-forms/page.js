"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const ContactFormsPageWrapper = dynamic(
  () => import("@/components/wrappers/ContactFormsPageWrapper"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const ContactFromsPage = () => {
  return (
    <ContactFormsPageWrapper />
  )
}

export default ContactFromsPage