"use client";

import React, { useState } from "react";
import { Product } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteProduct, useUpdateProduct } from "./hooks/useProducts";
import { useRouter } from "next/navigation";

interface ActionCellProps {
  product: Product;
  viewHref: string;
}

export const ActionCell = ({ product, viewHref }: ActionCellProps) => {
  const router = useRouter();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleDelete = () => {
    if (!product.documentId) return;

    deleteProduct(product.documentId, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
      },
      onError: (error) => {
        toast.error("Failed to delete product!");
        console.error(error);
      },
    });
  };

  return (
    <div className="flex justify-end items-center gap-2 mr-4">
      {/* View button  */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => {
          router.push(viewHref);
        }}
        className="p-2 border border-border cursor-pointer"
        disabled={isDeleting}
      >
        <Eye className="w-4 h-4 hover:cursor-pointer" />
      </Button>

      {/* Edit Button */}
      <Button
        variant="outline"
        size="icon-sm"
        className="p-2 border border-border cursor-pointer"
        onClick={() => {
          router.push(`/admin/products/${product.documentId}/edit`);
        }}
        disabled={isDeleting}
      >
        <Edit className="w-4 h-4" />
      </Button>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={handleDelete}
        className="p-2 border border-border cursor-pointer"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 text-destructive animate-spin" />
        ) : (
          <IconTrash className="w-4 h-4 text-destructive hover:cursor-pointer" />
        )}
      </Button>
    </div>
  );
};
