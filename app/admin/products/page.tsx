"use client";

import React, { useEffect, useState } from "react";
import { getProductsAdmin } from "@/services/adminServices/products.service";
import { DataTable } from "@/components/ui/data-table";
import { columns, Product } from "@/components/adminComponents/columns";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsAdmin().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleEdit = (documentId: string) => {
    console.log("EDIT PRODUCT WITH DOC_ID:", documentId);
  };

  return (
    <div className="p-8">
      {/* Page Header (Matching your Favorites title style) */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-primary text-3xl">PRODUCTS MANAGEMENT</div>
      </div>

      {/* Table UI Container */}
      <DataTable columns={columns(handleEdit)} data={products} />
    </div>
  );
}
