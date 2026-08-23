"use client";

import EditProductPage from "@/features/dashboard/pages/products/EditProductPage";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const productDocId = params.id as string;

  return (
    <div>
      <EditProductPage productDocId={productDocId} />
    </div>
  );
};

export default page;
