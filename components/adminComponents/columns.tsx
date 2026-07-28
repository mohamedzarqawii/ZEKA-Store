"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  onEdit: (documentId: string) => void,
): ColumnDef<Product>[] => [
  {
    accessorKey: "image",
    header: () => (
      <div className="font-extrabold text-xs text-center tracking-wider">
        Images
      </div>
    ),
    cell: ({ row }) => {
      const images = row.original.images;
      const imageUrl = images?.[0]?.url
        ? `http://localhost:1337${images[0].url}`
        : "/placeholder.png";

      return (
        <div className="flex justify-center">
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
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent font-extrabold hover:text-primary text-xs tracking-wider"
        >
          Product Name
          <ArrowUpDown className="ml-2 w-3.5 h-3.5" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <span className="font-bold text-base uppercase tracking-tight">
          {row.getValue("name")}
        </span>
        {row.original.featured && (
          <span className="bg-primary/10 px-2 py-0.5 border border-primary/20 rounded font-black text-[10px] text-primary uppercase tracking-wider">
            FEATURED
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => (
      <div className="font-extrabold text-xs text-center tracking-wider">
        Category
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <span className="font-semibold text-muted-foreground text-sm uppercase">
          {row.original.category?.name || "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: () => (
      <div className="font-extrabold text-xs text-center tracking-wider">
        Brand
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <span className="font-semibold text-muted-foreground text-sm uppercase">
          {row.original.brand?.name || "—"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent font-extrabold hover:text-primary text-xs tracking-wider"
        >
          Price
          <ArrowUpDown className="ml-2 w-3.5 h-3.5" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div className="text-center">
          <span className="font-extrabold text-primary text-base">
            ${price.toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => (
      <div className="font-extrabold text-xs text-center tracking-wider">
        Stock
      </div>
    ),
    cell: ({ row }) => {
      const stock = row.original.stock;
      const isAvailable = stock > 0;
      return (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              isAvailable
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {isAvailable ? `${stock} IN STOCK` : "OUT OF STOCK"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="font-extrabold text-xs text-center tracking-wider">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-primary/10 p-0 rounded-lg w-9 h-9 hover:text-primary transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-48 font-bold text-xs uppercase"
            >
              <DropdownMenuLabel className="text-[10px] text-muted-foreground tracking-widest">
                OPTIONS
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(product.documentId)
                }
                className="gap-2 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> COPY DOC ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onEdit(product.documentId)}
                className="gap-2 focus:bg-primary/10 text-primary focus:text-primary cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" /> EDIT PRODUCT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
