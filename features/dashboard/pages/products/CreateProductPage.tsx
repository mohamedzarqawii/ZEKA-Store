"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  CreateProductSchema,
  ReqCreateProductType,
} from "@/types/admin/product";
import { CreateProductAdmin } from "@/services/adminServices/products.service";
import {
  getShopBrands,
  getShopCategories,
} from "@/services/shopServices/shop.service";
import {
  useGetBrands,
  useGetCategories,
  useGetProducts,
} from "./hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Image, Pin, Plus } from "lucide-react";
import { IconTrash } from "@tabler/icons-react";
import { uploadMedia } from "@/services/adminServices/media.service";
import { getChangedValues } from "@/utils/getChangedValues";
import { Badge } from "@/components/ui/badge";

const CreateProductPage = () => {
  const router = useRouter();

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

  const { refetch: refetchProducts } = useGetProducts();
  type Option = {
    label: string;
    value: string;
  };
  const { data: categories } = useGetCategories();

  const { data: brands } = useGetBrands();
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

  const handleCreate = (data: ReqCreateProductType) => {
    CreateProductAdmin(data).then(() => {
      toast.success("Product created successfully!");
      router.push("/admin/products");
      refetchProducts();
    });
  };

  // ------------------ handle main image -------------------
  const handleSetMainImage = (index: number) => {
    setSelectedImages((prev) => {
      const selectedImage = prev[index];

      return [selectedImage, ...prev.filter((_, i) => i !== index)];
    });
  };

  const {
    initialValues,
    dirty,
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      brand: "",
      images: [],
    },
    validationSchema: CreateProductSchema,
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

      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
      setSelectedImages([]);

      await handleCreate(changedValues);
    },
  });

  return (
    <div>
      <div className="text-primary text-3xl">CREATE PRODUCT</div>
      <div className="mt-10">
        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-7 w-full h-fit"
            noValidate
          >
            {/* 1 */}
            <div className="flex flex-col justify-center items-center gap-4"></div>

            {/* 2 */}

            <div className="group flex flex-col justify-center items-end gap-4 w-full">
              <Field>
                <FieldLabel htmlFor="name">
                  Name<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name && !!touched.name}
                />
                {errors.name && touched.name && (
                  <FieldError>{errors.name}</FieldError>
                )}
              </Field>

              {/* ----------------------------------------------------- */}

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  name="description"
                  value={values.description}
                  rows={4}
                  onChange={handleChange}
                  aria-invalid={!!errors.description && !!touched.description}
                />
                {errors.description && touched.description && (
                  <FieldError>{errors.description}</FieldError>
                )}
              </Field>

              {/* ----------------------------------------------------- */}
              <div className="flex gap-4 w-full">
                <Field>
                  <FieldLabel htmlFor="price">
                    Price<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    name="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    aria-invalid={!!errors.price && !!touched.price}
                  />
                  {errors.price && touched.price && (
                    <FieldError>{errors.price}</FieldError>
                  )}
                </Field>

                {/* ----------------------------------------------------- */}
                <Field>
                  <FieldLabel htmlFor="stock">
                    Stock<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    name="stock"
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    aria-invalid={!!errors.stock && !!touched.stock}
                  />
                  {errors.stock && touched.stock && (
                    <FieldError>{errors.stock}</FieldError>
                  )}
                </Field>
              </div>

              {/* ----------------------------------------------------- */}
              <div className="flex gap-4 w-full">
                <Field>
                  <FieldLabel htmlFor="category">
                    Category<span className="text-destructive">*</span>
                  </FieldLabel>

                  <Select
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
                        {categoriesOptions.map((option, i: number) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.category && touched.category && (
                    <FieldError>{errors.category}</FieldError>
                  )}
                </Field>

                {/* ----------------------------------------------------- */}

                <Field>
                  <FieldLabel htmlFor="brand">
                    Brand<span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
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
                        {brandsOptions.map((option, i: number) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.brand && touched.brand && (
                    <FieldError>{errors.brand}</FieldError>
                  )}
                </Field>
              </div>

              <div className="w-full">
                <div className="mb-2 w-full">Gallery Images</div>

                <div className="flex flex-col p-4 border border-primary rounded-lg w-full h-fit">
                  {selectedImages.length > 0 ? (
                    <div className="flex justify-between items-center">
                      <div className="text-[#A1A1A1] text-sm">
                        Selected Images ({selectedImages.length})
                      </div>

                      <div>
                        <Field className="w-35">
                          <Button
                            variant="outline"
                            className="border--[#A1A1A1]"
                            type="button"
                            asChild
                          >
                            <FieldLabel
                              htmlFor="image"
                              className="cursor-pointer"
                            >
                              Select Image
                            </FieldLabel>
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
                              setSelectedImages((prev) => [
                                ...prev,
                                ...newImages,
                              ]);
                              e.target.value = "";
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  ) : null}

                  {selectedImages.length > 0 ? (
                    <div className="flex flex-col justify-center items-center gap-2 p-3 w-full">
                      {selectedImages.length > 0 && (
                        <div className="gap-4 grid grid-cols-5 w-full">
                          {/* <FieldLabel className="w-full text-primary text-sm">
                              New photos to upload ({selectedImages.length})
                            </FieldLabel> */}
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative w-full h-49">
                              <img
                                src={image.previewUrl}
                                className="border rounded-md w-full object-cover aspect-square"
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

                              {index === 0 ? (
                                <Badge
                                  variant="outline"
                                  className="top-3 left-2 absolute border border-border rounded-full text-white"
                                >
                                  Main
                                </Badge>
                              ) : (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="rounded-icon-sm"
                                  onClick={() => handleSetMainImage(index)}
                                  className="top-2 left-2 absolute border border-border rounded-full text-white"
                                >
                                  <Pin className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <Image
                        className="w-12 h-12 text-[#A1A1A1]"
                        strokeWidth={1}
                      />
                      <div className="text-sm">Drop your image here</div>
                      <div className="text-[#A1A1A1] text-xs">
                        Accepts PNG, JPG, WebP
                      </div>

                      <div>
                        <Field className="w-35">
                          <Button
                            variant="outline"
                            className="border--[#A1A1A1]"
                            type="button"
                            asChild
                          >
                            <FieldLabel
                              htmlFor="image"
                              className="cursor-pointer"
                            >
                              Select Image
                            </FieldLabel>
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
                              setSelectedImages((prev) => [
                                ...prev,
                                ...newImages,
                              ]);
                              e.target.value = "";
                            }}
                          />
                        </Field>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary px-4 py-4 rounded-lg w-full font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
              >
                CREATE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
