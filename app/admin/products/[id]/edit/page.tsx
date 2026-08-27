"use client";

import EditProductPage from "@/features/dashboard/pages/products/EditProductPage";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <EditProductPage productId={String(productId)} />
    </div>
  );
};

export default page;
