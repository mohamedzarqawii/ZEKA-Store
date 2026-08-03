"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionCell } from "./ActionCell";
import { toast } from "sonner";

export interface Product {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: { id: number; url: string }[];
  category: { id: number; name: string };
  brand: { id: number; name: string };
  featured: boolean;
  isFavorite: boolean;
  favoriteDocId: string | null;
}

export const columns = (
  onEdit: (documentId: string, updatedData: Partial<Product>) => void,
  onDelete: (documentId: string) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "image",
    header: () => (
      <div className="pl-3 font-extrabold text-sm text-left tracking-wider">
        Images
      </div>
    ),
    cell: ({ row }) => {
      const images = row.original.images;
      const imageUrl = images?.[0]?.url
        ? `http://localhost:1337${images[0].url}`
        : "/images/placeholder.jpeg";

      return (
        // 👈 MODIFIED: تغيير justify-center إلى justify-start مع pl-3 لضبط محاذاة الصورة لليسار
        <div className="flex justify-start pl-3">
          <div className="relative bg-muted/20 border border-border/50 rounded-lg w-12 h-12 overflow-hidden">
            <img
              src={imageUrl}
              alt={row.original.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent -ml-3 hover:text-primary text-sm tracking-wider"
        >
          Product Name
          <ArrowUpDown className="w-3.5 h-3.5" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-start items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("name"));
            toast.success("Copied to clipboard", { position: "bottom-right" });
          }}
          className="-ml-3 text-primary hover:text-secondary text-sm tracking-wider"
        >
          {row.getValue("name")}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => (
      <div className="font-extrabold text-sm text-left tracking-wider">
        Category
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        <span className="font-semibold text-muted-foreground text-sm">
          {row.original.category?.name || "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: () => (
      <div className="font-extrabold text-sm text-left tracking-wider">
        Brand
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        <span className="font-semibold text-muted-foreground text-sm uppercase">
          {row.original.brand?.name || "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent -ml-4 font-extrabold hover:text-primary text-sm tracking-wider"
        >
          Price
          <ArrowUpDown className="w-3.5 h-3.5" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div className="text-left">
          <span className="font-extrabold text-sm">${price.toFixed(2)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => (
      <div className="font-extrabold text-sm text-center tracking-wider">
        Stock
      </div>
    ),
    cell: ({ row }) => {
      const stock = row.original.stock;
      const isAvailable = stock > 0;
      return (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-black tracking-wider border ${
              isAvailable
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {isAvailable ? `${stock} In stock` : "Out of stock"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="font-extrabold text-xs text-end tracking-wider">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      return (
        <ActionCell
          product={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );
    },
  },
];
