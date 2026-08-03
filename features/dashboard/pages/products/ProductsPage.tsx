"use client";

import { DataTable } from "@/components/DataTable";
import {
  DeleteProductAdmin,
  getProductsAdmin,
  UpdateProductAdmin,
} from "@/services/adminServices/products.service";
import React, { useEffect, useState } from "react";
import { columns, Product } from "./columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IconPlusFilled } from "@tabler/icons-react";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDocId, setProductDocId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    getProductsAdmin().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleEdit = (documentId: string, updatedData: Partial<Product>) => {
    console.log("EDIT PRODUCT WITH DOC_ID:", documentId);
    setProductDocId(documentId);

    if (!documentId) return;

    UpdateProductAdmin(documentId, updatedData).then((res) => {
      toast.success("Product updated successfully!");
      console.log("Updated Successfully:", res);
      setProducts((prevProducts: any[]) =>
        prevProducts.map((p) =>
          p.documentId === documentId ? { ...p, ...updatedData } : p,
        ),
      );
    });
  };

  const handleDelete = (documentId: string) => {
    console.log("DELETE PRODUCT WITH DOC_ID:", documentId);
    setProductDocId(documentId);

    if (!documentId) return;

    DeleteProductAdmin(documentId).then((res) => {
      toast.success("Product deleted successfully!");
      console.log("Deleted Successfully:", res);
      setProducts((prevProducts: any[]) =>
        prevProducts.filter((p) => p.documentId !== documentId),
      );
    });
  };

  const handleCreate = () => {
    console.log("CREATE PRODUCT WITH DOC_ID:", productDocId);
    if (!productDocId) return;
  };

  const path = "/admin/products/create";

  return (
    <div>
      <div className="text-primary text-3xl">PRODUCTS MANAGEMENT</div>
      <div className="mt-10">
        <DataTable
          columns={columns(handleEdit, handleDelete)}
          data={products}
          path={path}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
