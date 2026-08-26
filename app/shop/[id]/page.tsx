"use client";

import ProductPage from "@/features/shop/pages/shop/ProductPage";
import { useParams } from "next/navigation";

const productView = () => {
  const { id } = useParams();

  return (
    <div>
      <ProductPage productId={id as string} />
    </div>
  );
};

export default productView;
