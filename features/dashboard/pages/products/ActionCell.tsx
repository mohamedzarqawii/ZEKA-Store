"use client";

import React, { useState } from "react";
import { Product } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, Copy, Files } from "lucide-react";
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

interface ActionCellProps {
  product: Product;
  onEdit: (documentId: string, updatedData: Partial<Product>) => void;
  onDelete: (documentId: string) => void;
}

export const ActionCell = ({ product, onEdit, onDelete }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price?.toString() || "0");
  const [stock, setStock] = useState(product.stock?.toString() || "0");
  const [description, setDescription] = useState(product.description || "");

  const handleSave = () => {
    const updatedData = {
      name,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      description,
    };

    onEdit(product.documentId, updatedData);
    setOpen(false);
  };

  return (
    <div className="flex justify-end items-center gap-2">
      {/* Edit Button */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            className="p-2 border border-border cursor-pointer"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="gap-4 grid">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Edit Product</h4>
            </div>
            <div className="gap-3 grid">
              <div className="items-center gap-4 grid grid-cols-3">
                <Label htmlFor={`name-${product.id}`}>Name</Label>
                <Input
                  id={`name-${product.id}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>

              <div className="items-center gap-4 grid grid-cols-3">
                <Label htmlFor={`price-${product.id}`}>Price</Label>
                <Input
                  id={`price-${product.id}`}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>

              <div className="items-center gap-4 grid grid-cols-3">
                <Label htmlFor={`stock-${product.id}`}>Stock</Label>
                <Input
                  id={`stock-${product.id}`}
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="col-span-2 h-8"
                />
              </div>

              <div className="items-start gap-4 grid grid-cols-3">
                <Label htmlFor={`desc-${product.id}`} className="pt-2">
                  Description
                </Label>
                <Textarea
                  id={`desc-${product.id}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-2 min-h-20 text-xs resize-none"
                  rows={3}
                />
              </div>

              <Button
                variant="default"
                onClick={handleSave}
                className="mt-2 p-2 cursor-pointer"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Delete Button */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => onDelete(product.documentId)}
        className="p-2 border border-border cursor-pointer"
      >
        <IconTrash className="text-destructive hover:cursor-pointer" />
      </Button>
    </div>
  );
};
