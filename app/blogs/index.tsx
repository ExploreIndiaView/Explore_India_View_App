import BackHeader from "@/components/BackHeader";
import Blogs from "@/components/Blogs";
import React from "react";

export default function BlogsPage() {
  return (
    <>
    <BackHeader />
    <Blogs expand={true} />
    </>
  );
}
