"use client";

import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { useGetAdminProducts } from "./hooks/useProducts";
import { useState } from "react";

const ProductsPage = () => {
  // ------------------- States -------------------
  const storageKey = "productsView";

  // ------------------- Query Fetches -------------------
  // --- get products
  const { data: productsData, isLoading: isProductsLoading } =
    useGetAdminProducts();

  // ------------------- Code -------------------
  return (
    <div className="w-full overflow-hidden">
      <div className="text-primary text-3xl">PRODUCTS MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns()}
          data={productsData?.data || []}
          createHref="/admin/products/create"
          storageKey={storageKey}
          isLoading={isProductsLoading}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
