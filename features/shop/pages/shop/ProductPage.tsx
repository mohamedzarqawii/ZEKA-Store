"use client";

import {
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { ProductType } from "@/types/product";
import { getImageUrl } from "@/utils/getImageUrl";
import ProductCard from "../../components/ProductCard";
import {
  useGetShopProduct,
  useGetShopRelatedProductsByCategory,
} from "./hooks/useShop";
import { Loader2 } from "lucide-react";

interface ViewProps {
  productId: string;
}

const ProductPage = ({ productId }: ViewProps) => {
  const [rating, setRating] = useState(3);

  const { data: product, isLoading: isProductLoading } = useGetShopProduct(
    Number(productId),
  );

  // ------------- get related product by category -------------
  const { data: relatedProducts = [], isLoading: isRelatedCategoryLoading } =
    useGetShopRelatedProductsByCategory(product?.category?.id);

  // ------------- handle change images -------------

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageUrl =
    selectedImage || product?.images?.[0] || "/images/placeholder.jpeg";

  const handleChangeImage = (url: string) => {
    setSelectedImage(url);
  };

  if (isProductLoading) {
    return (
      <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
        {/* 1 */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-primary text-3xl">Loading Product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-10 my-15">
      <div className="flex gap-6 w-full h-fit">
        {/* left */}
        <div className="relative flex gap-8 w-full max-w-2xl">
          <div className="flex flex-col gap-4 rounded-2xl h-130 overflow-y-auto no-scrollbar">
            {product?.images?.length ? (
              product.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  onClick={() => handleChangeImage(image)}
                  className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
                  alt={product.name}
                />
              ))
            ) : (
              <img
                src="/images/placeholder.jpeg"
                className="border border-primary rounded-2xl w-25 h-25 object-center object-cover"
                alt={product?.name}
              />
            )}
          </div>

          <div>
            {!isProductLoading ? (
              <img
                src={imageUrl}
                className="border border-primary rounded-2xl w-130 h-130 object-center object-cover hover:cursor-pointer"
                alt={product?.name}
              />
            ) : null}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between gap-4 w-full h-130">
          <div>
            <span className="text-primary">
              {product?.category?.name || "Uncategorized"} |{" "}
            </span>
            <span className="text-primary">
              {product?.brand?.name || "No Brand"}
            </span>

            <div className="mt-6 text-5xl">{product?.name}</div>

            {/* Rates */}
            <div className="flex items-center gap-2 mt-5">
              {rating !== 0 && <div className="text-sm">{rating}</div>}
              {[1, 2, 3, 4, 5].map((star: number) => (
                <button key={star} onClick={() => setRating(star)}>
                  {star <= rating ? (
                    <IconStarFilled className="size-5 text-primary cursor-pointer" />
                  ) : (
                    <IconStar className="size-5 text-primary cursor-pointer" />
                  )}
                </button>
              ))}
              <div className="pl-2 border-zinc-400 border-l-2 text-zinc-400 text-sm">
                1501 Ratings
              </div>
            </div>

            {/* price */}
            <div className="mt-6 text-primary text-3xl">
              ${product?.price.toFixed(2)}
            </div>

            {/* description */}
            <div className="flex flex-col gap-2 mt-6">
              Description:
              <div className="text-zinc-400 text-sm">
                {product?.description}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="flex items-center gap-3 w-full">
              {/* Counter or Add to Cart */}

              {/* {isInCart && cartItem ? (
                <Counter
                  product={cartItem}
                  classname="flex justify-between items-center bg-primary h-19 rounded-2xl w-full font-extrabold text-lg text-center "
                  plusClass="flex justify-center items-center px-10 py-6  text-lg hover:cursor-pointer "
                  minusClass="flex justify-center items-center px-10 py-6 text-lg "
                  spanClass="mx-auto text-lg select-none"
                  trashSize="size-5"
                />
              ) : ( */}
              <button className="bg-primary hover:bg-secondary px-4 py-6 rounded-2xl w-full font-extrabold text-lg text-center transition-colors duration-300 hover:cursor-pointer">
                ADD TO CART
              </button>
              {/* )} */}

              {/* add to favorites button */}
              <button className="px-6 py-6 border border-primary hover:border-secondary rounded-2xl w-fit text-lg transition-transform duration-300 cursor-pointer">
                {/* {isFavorite ? (
                  <IconHeartFilled className="size-7 text-primary" />
                ) : (
                <IconHeart className="size-7 text-primary" />
                )} */}
                <IconHeart className="size-7 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* suggested products */}
      <div>
        <div className="flex flex-col gap-8 mt-15">
          <div className="text-primary text-3xl">
            MORE FROM {product?.category.name}
          </div>

          {isRelatedCategoryLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="gap-4 sm:gap-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full">
              {relatedProducts?.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
