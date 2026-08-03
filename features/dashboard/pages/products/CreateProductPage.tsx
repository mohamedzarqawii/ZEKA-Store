"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/types/auth/login";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldError,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import {
  CreateProductSchema,
  ReqCreateProductType,
} from "@/types/admin/product";
import { CreateProductAdmin } from "@/services/adminServices/products.service";
import { toast } from "sonner";
import { getBrands, getCategories } from "@/services/shop.service";
import { Textarea } from "@/components/ui/textarea";

const CreateProductPage = () => {
  const router = useRouter();

  type Option = {
    label: string;
    value: string;
  };
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);
  const [brandsOptions, setBrandsOptions] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleCreate = (data: ReqCreateProductType) => {
    CreateProductAdmin(data).then((res) => {
      toast.success("Product created successfully!");
      router.push("/admin/products");
    });
  };

  const CreateProductFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      brand: "",
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = CreateProductFormik;

  useEffect(() => {
    // ----------- get categories names ------------
    const loadCategories = () => {
      getCategories().then((res) => {
        if (Array.isArray(res)) {
          const categories = res.map((category: any) => ({
            label: category.name,
            value: String(category.id),
          })) as unknown as Option[];
          setCategoriesOptions(categories);
        }
      });
    };
    loadCategories();

    // ----------- get brands names ------------
    const loadBrands = () => {
      getBrands().then((res) => {
        if (Array.isArray(res)) {
          const brands = res.map((brand: any) => ({
            label: brand.name,
            value: String(brand.id),
          })) as unknown as Option[];
          setBrandsOptions(brands);
        }
      });
    };
    loadBrands();
  }, []);

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
            <div className="flex flex-col justify-center items-center gap-4">
              {/* <div className="text-md text-zinc-400">
                Login to access your performance data
              </div> */}
            </div>

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
