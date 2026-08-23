"use client";

import { toast } from "sonner";
import {
  useGetBrands,
  useGetCategories,
  useGetProduct,
  useUpdateProduct,
} from "./hooks/useProducts";
import { Product } from "./columns";
import { Button } from "@/components/ui/button";
import { Loader2, Pin, PinOff, Plus } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/utils/getImageUrl";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { UpdateProductSchema } from "@/types/admin/product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getChangedValues } from "@/utils/getChangedValues";
import { Textarea } from "@/components/ui/textarea";
import { uploadMedia } from "@/services/adminServices/media.service";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

interface EditProductPageProps {
  productDocId: string;
}
const EditProductPage = ({ productDocId }: EditProductPageProps) => {
  const router = useRouter();

  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();
  const {
    data: product,
    isLoading: isProductLoading,
    refetch: refetchProduct,
  } = useGetProduct(productDocId);
  const { data: categories } = useGetCategories();
  const { data: brands } = useGetBrands();

  // ------------------- Options (تنسيق الخيارات بـ ID) -------------------
  type Option = {
    label: string;
    value: string;
  };

  const categoriesOptions: Option[] = Array.isArray(categories)
    ? categories.map((category: any) => ({
        label: category.name,
        value: category.documentId
          ? String(category.documentId)
          : String(category.id),
      }))
    : [];

  const brandsOptions: Option[] = Array.isArray(brands)
    ? brands.map((brand: any) => ({
        label: brand.name,
        value: brand.documentId ? String(brand.documentId) : String(brand.id),
      }))
    : [];

  // ------------------ handle edit product -------------------

  const handleEditProduct = async (updatedData: Partial<Product>) => {
    if (!productDocId) return;

    if (updatedData.stock !== undefined)
      updatedData.stock = Number(updatedData.stock);
    await updateProduct(
      { productDocId, updatedData },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
        },
        onError: (error) => {
          toast.error("Failed to update product!");
          console.error(error);
        },
      },
    );
  };

  interface PreviewImage {
    file: File;
    previewUrl: string;
  }
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

  // ------------------ handle remove selected image -------------------

  const handleRemoveSelectedImage = (index: number) => {
    setSelectedImages((prev) => {
      const image = prev[index];
      URL.revokeObjectURL(image.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ------------------ handle main image -------------------

  const handleSetMainImage = (imageId: number) => {
    const newImagesOrder = [
      imageId,
      ...values.images.filter((id) => id !== imageId),
    ];

    setFieldValue("images", newImagesOrder);
  };

  // ------------------ handle remove image -------------------

  const handleRemoveImage = (imageId: number) => {
    const newImages = [...values.images.filter((id) => id !== imageId)];
    setFieldValue("images", newImages);
  };

  // ------------------ Formik -------------------

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
    setFieldTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      category: product?.category
        ? (product.category as any).documentId || String(product.category.id)
        : "",
      brand: product?.brand
        ? (product.brand as any).documentId || String(product.brand.id)
        : "",
      images: product?.images?.map((image) => image.id) || [],
    },
    validationSchema: UpdateProductSchema,
    onSubmit: async (values) => {
      let uploadedImagesIds: number[] = [];

      if (selectedImages.length > 0) {
        const resIds = await Promise.all(
          selectedImages.map((image) =>
            uploadMedia(image.file).then((res) => {
              return res[0]?.id;
            }),
          ),
        );

        uploadedImagesIds = resIds.filter(
          (id): id is number => id !== undefined,
        );
      }

      const updatedValues = {
        ...values,
        images: [...values.images, ...uploadedImagesIds],
      };

      const changedValues = getChangedValues(updatedValues, initialValues);
      await handleEditProduct(changedValues);

      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      setSelectedImages([]);
      refetchProduct();
    },
  });

  const mainImage = product?.images?.find(
    (image) => image.id === values.images[0],
  );

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
        <form onSubmit={handleSubmit}>
          {/* Header Bar */}
          <div className="flex justify-between items-center">
            <div className="text-primary text-3xl">Edit {product.name}</div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                router.push(`/admin/products/${product.documentId}`);
              }}
            >
              View Mode
            </Button>
          </div>

          {/* Basic information */}
          <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-10 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
            <div className="font-semibold text-lg">Basic Information</div>
            <div className="flex flex-wrap gap-6 mt-5">
              <Field>
                <FieldLabel className="text-primary text-sm">ID</FieldLabel>
                <div className="text-muted-foreground">{product.id}</div>
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Document ID
                </FieldLabel>
                <div className="text-muted-foreground">
                  {product.documentId}
                </div>
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="w-full sm:w-96"
                  aria-invalid={!!errors.name && !!touched.name}
                />
                {errors.name && touched.name && (
                  <FieldError>{errors.name}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel className="text-primary text-sm">
                  Description
                </FieldLabel>
                <Textarea
                  rows={4}
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="w-full sm:w-96"
                  aria-invalid={!!errors.description && !!touched.description}
                />
                {errors.description && touched.description && (
                  <FieldError>{errors.description}</FieldError>
                )}
              </Field>
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
            <div className="font-semibold text-lg">Product Details</div>
            <div className="flex flex-wrap gap-6 mt-5">
              <div className="flex flex-col gap-4 w-full sm:w-96">
                {/* Brand */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Brand<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    key={`brand-${values.brand}`}
                    value={values.brand}
                    onValueChange={(value) => setFieldValue("brand", value)}
                    onOpenChange={(open) => {
                      if (!open) setFieldTouched("brand", true);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {brandsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.brand && touched.brand && (
                    <FieldError>{String(errors.brand)}</FieldError>
                  )}
                </Field>

                {/* Category */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Category<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    key={`category-${values.category}`}
                    value={values.category}
                    onValueChange={(value) => setFieldValue("category", value)}
                    onOpenChange={(open) => {
                      if (!open) setFieldTouched("category", true);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoriesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && touched.category && (
                    <FieldError>{String(errors.category)}</FieldError>
                  )}
                </Field>

                {/* Price */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Price
                  </FieldLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    className="w-full"
                    aria-invalid={!!errors.price && !!touched.price}
                  />
                  {errors.price && touched.price && (
                    <FieldError>{errors.price}</FieldError>
                  )}
                </Field>

                {/* Stock */}
                <Field>
                  <FieldLabel className="text-primary text-sm">
                    Stock
                  </FieldLabel>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    className="w-full"
                    aria-invalid={!!errors.stock && !!touched.stock}
                  />
                  {errors.stock && touched.stock && (
                    <FieldError>{errors.stock}</FieldError>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Product Photos */}
          <div className="flex flex-col bg-[#1a1a1a]/20 backdrop-blur-md mt-6 px-8 py-8 border border-primary rounded-3xl w-full h-fit">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg">Product Photos</div>
              <div>
                <Button variant="default" type="button" asChild>
                  <label htmlFor="image" className="cursor-pointer">
                    <Plus />
                    Add Photo
                  </label>
                </Button>

                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    const newImages = files.map((file) => ({
                      file,
                      previewUrl: URL.createObjectURL(file),
                    }));
                    setSelectedImages((prev) => [...prev, ...newImages]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-5">
              <Field>
                <FieldLabel className="mb-3 text-primary text-sm">
                  Main photo
                </FieldLabel>
                <div className="relative flex gap-8 w-full max-w-2xl">
                  {values?.images?.length > 0 ? (
                    <img
                      src={mainImage?.url && getImageUrl(mainImage.url)}
                      className="border border-primary rounded-2xl w-58 h-58 object-center object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      No photos
                    </div>
                  )}
                </div>
              </Field>

              <Field>
                <FieldLabel className="mb-2 text-primary text-sm">
                  Existing Photos
                  {values?.images?.length > 0 ? (
                    <div>({values?.images?.length})</div>
                  ) : null}
                </FieldLabel>
                <div className="flex flex-wrap gap-4">
                  {values?.images?.length > 0 ? (
                    product.images
                      ?.filter((image) => values.images.includes(image.id))
                      .map((image) => (
                        <div className="relative" key={image.id}>
                          <img
                            src={getImageUrl(image.url)}
                            alt={product.name}
                            className="border border-primary rounded-2xl w-32 h-32 object-center object-cover"
                          />

                          <Button
                            type="button"
                            variant="outline"
                            size="rounded-icon-sm"
                            onClick={() => handleRemoveImage(image.id)}
                            className="top-2 right-2 absolute border border-border rounded-full text-white cursor-pointer hover:cursor-pointer"
                          >
                            <IconTrash className="w-4 h-4 text-destructive hover:cursor-pointer" />
                          </Button>
                          {mainImage?.id == image.id ? (
                            <Badge
                              variant="outline"
                              className="top-3 left-2 absolute border border-border rounded-full text-white cursor-pointer hover:cursor-pointer"
                            >
                              Main
                            </Badge>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size={"rounded-icon-sm"}
                              onClick={() => handleSetMainImage(image.id)}
                              className="top-2 left-2 absolute border border-border rounded-full text-white cursor-pointer hover:cursor-pointer"
                            >
                              <Pin className="w-4 h-4 hover:cursor-pointer" />
                            </Button>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      No photos
                    </div>
                  )}
                </div>
              </Field>

              <div className="w-full">
                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4 border-primary/40 border-t w-full">
                    <FieldLabel className="w-full text-primary text-sm">
                      New photos to upload ({selectedImages.length})
                    </FieldLabel>
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative w-32 h-32">
                        <img
                          src={image.previewUrl}
                          className="border-2 border-primary border-dashed rounded-2xl w-32 h-32 object-cover"
                        />

                        <Button
                          type="button"
                          variant="outline"
                          size="rounded-icon-sm"
                          onClick={() => handleRemoveSelectedImage(index)}
                          className="top-2 right-2 absolute border border-border rounded-full text-white cursor-pointer hover:cursor-pointer"
                        >
                          <IconTrash className="w-4 h-4 text-destructive hover:cursor-pointer" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button
              type="submit"
              variant="default"
              disabled={(!dirty && selectedImages.length === 0) || isUpdating}
              className="p-6 rounded-lg text-md hover:cursor-pointer"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

export default EditProductPage;
