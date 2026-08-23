"use client";

import React, { useEffect, useState } from "react";
import { useGetProduct } from "./hooks/useProducts";
import { Loader2 } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/utils/getImageUrl";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewProps {
  productDocId: string;
}

export const ViewProductPage = ({ productDocId }: ViewProps) => {
  const { data: product, isLoading: isProductLoading } =
    useGetProduct(productDocId);

  const images = product?.images;
  const imageUrl = images?.[0]?.url
    ? `http://localhost:1337${images[0].url}`
    : "/images/placeholder.jpeg";

  const router = useRouter();

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    product && (
      <div>
        <div className="flex justify-between items-center">
          <div className="text-primary text-3xl">{product.name}</div>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push(`/admin/products/${product.documentId}/edit`);
            }}
          >
            Edit Mode
          </Button>
        </div>
        {/* Basic information */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
          <div className="text-lg">Basic Information</div>
          <div className="flex flex-wrap gap-6 mt-5">
            <Field>
              <FieldLabel className="text-primary text-sm">ID</FieldLabel>
              <div className="text-muted-foreground">{product?.id}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Document ID
              </FieldLabel>
              <div className="text-muted-foreground">{product?.documentId}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Name</FieldLabel>
              <div className="text-muted-foreground">{product?.name}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">
                Desciption
              </FieldLabel>
              <div className="text-muted-foreground">
                {product?.description}
              </div>
            </Field>
          </div>
        </div>

        {/* Brand details */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
          <div className="text-lg">Product Details</div>
          <div className="flex flex-wrap gap-6 mt-5">
            <Field>
              <FieldLabel className="text-primary text-sm">Brand</FieldLabel>
              <div className="text-muted-foreground">
                {product?.brand?.name}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Category</FieldLabel>
              <div className="text-muted-foreground">
                {product?.category?.name}
              </div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Price</FieldLabel>
              <div className="text-muted-foreground">${product?.price}</div>
            </Field>

            <Field>
              <FieldLabel className="text-primary text-sm">Stock</FieldLabel>
              <div className="text-muted-foreground">{product?.stock}</div>
            </Field>
          </div>
        </div>

        {/* Product Photos */}
        <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
          <div className="text-lg">Product Photos</div>

          <div className="flex flex-wrap gap-6 mt-5">
            <Field>
              <FieldLabel className="mb-3 text-primary text-sm">
                Main photo
              </FieldLabel>

              <div className="relative flex gap-8 w-full max-w-2xl">
                <div>
                  <img
                    src={imageUrl}
                    className="border border-primary rounded-2xl w-130 h-130 object-center object-cover hover:cursor-pointer"
                  />
                </div>
              </div>
            </Field>

            <Field className="mt-5">
              <FieldLabel className="mb-3 text-primary text-sm">
                Other photos
              </FieldLabel>
              <div className="flex gap-4">
                {product?.images && product?.images?.length > 1 ? (
                  product?.images.slice(1).map((image) => (
                    <img
                      key={image.id}
                      src={getImageUrl(image.url)}
                      onClick={() => {
                        // handleChangeImage(image.url);
                      }}
                      className="border border-primary rounded-2xl w-45 h-45 object-center object-cover hover:cursor-pointer"
                    />
                  ))
                ) : (
                  <div className="text-destructive text-sm">
                    No other images
                  </div>
                )}
              </div>
            </Field>
          </div>
        </div>
      </div>
    )
  );
};
