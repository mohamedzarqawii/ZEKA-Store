"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionCell } from "./ActionCell";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
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

export const columns = (): ColumnDef<Product>[] => [
  // ---------------- id ----------------
  {
    accessorKey: "id",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Id
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("documentId"));
            toast.success("Copied to clipboard", { position: "bottom-right" });
          }}
        >
          {row.getValue("id")}
        </Button>
      </div>
    ),
  },

  // ---------------- image ----------------
  {
    accessorKey: "image",
    header: () => <div>Images</div>,

    cell: ({ row }) => {
      const images = row.original.images;
      const imageUrl = images?.[0]
        ? `${images[0]}`
        : "/images/placeholder.jpeg";

      return (
        <div>
          <img
            src={imageUrl}
            alt={row.original.name}
            className="rounded-lg w-12 h-12 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      );
    },
  },

  // ---------------- name ----------------
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Product Name
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => (
      <div>
        <Button
          variant="link"
          onClick={() => {
            navigator.clipboard.writeText(row.getValue<string>("name"));
            toast.success("Copied to clipboard", { position: "bottom-right" });
          }}
        >
          {row.getValue("name")}
        </Button>
      </div>
    ),
  },

  // ---------------- category ----------------
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,

    cell: ({ row }) => (
      <div className="text-sm">{row.original.category?.name || "—"}</div>
    ),
  },

  // ---------------- brand ----------------
  {
    accessorKey: "brand",
    header: () => <div className="text-left">Brand</div>,

    cell: ({ row }) => (
      <div className="text-sm">{row.original.brand?.name || "—"}</div>
    ),
  },

  // ---------------- price ----------------
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:text-secondary text-xs"
        >
          Price
          <ArrowUpDown />
        </Button>
      </div>
    ),

    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div className="pl-4 text-sm">${price.toFixed(2)}</div>;
    },
  },

  // ---------------- stock ----------------
  {
    accessorKey: "stock",
    header: () => <div>Stock</div>,

    cell: ({ row }) => {
      const stock = row.original.stock;
      const isAvailable = stock > 0;
      return (
        <Badge variant="outline">
          {isAvailable ? `${stock} In stock` : "Out of stock"}
        </Badge>
      );
    },
  },

  // ---------------- actions ----------------
  {
    id: "actions",
    header: () => <div className="flex justify-end mr-4">Actions</div>,

    cell: ({ row }) => {
      const id = row.getValue<string>("id");
      const href = `/admin/products/${id}`;
      return <ActionCell product={row.original} viewHref={href} />;
    },
  },
];
