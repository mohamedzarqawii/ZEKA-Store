"use client";

import {
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import Counter from "@/components/Counter";
import Link from "next/link";
import { getImageUrl } from "@/utils/getImageUrl";
import { getProduct, getRelatedProductsByBrand } from "@/services/shop.service";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [rating, setRating] = useState(3);
  const [imageUrl, setImageUrl] = useState<string>("");

  // ------------- get product -------------
  useEffect(() => {
    if (!id) return;

    const lodadProduct = async () => {
      const product = await getProduct(id as string);
      setProduct(product);
    };

    lodadProduct();
  }, [id]);

  // ------------- handle change images -------------
  const handlChangeImage = (url: string) => {
    setImageUrl(url);
  };

  // ------------- get related product by category -------------

  useEffect(() => {
    if (!product) return;

    const loadRelated = async () => {
      const data = await getRelatedProductsByBrand(product.category.id);

      setRelatedProducts(data.filter((p: ProductType) => p.id !== product.id));
      setImageUrl(product.images[0].url);
    };
    loadRelated();
  }, [product]);

  if (!product) {
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
    <div className="mx-10 mt-15">
      <div className="flex gap-6 w-full h-fit">
        {/* left */}
        <div className="relative flex gap-8 w-full max-w-2xl">
          <div className="flex flex-col gap-4 rounded-2xl h-130 overflow-y-auto shrink-0 no-scrollbar">
            {product.images.map((image) => (
              <img
                key={image.id}
                src={getImageUrl(image.url)}
                onClick={() => {
                  handlChangeImage(image.url);
                }}
                alt={product.name}
                className="border border-primary rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
              />
            ))}
            <div className="right-0 bottom-0 left-0 absolute bg-linear-to-t from-black/60 to-transparent rounded-b-2xl h-12 pointer-events-none"></div>
          </div>

          <div>
            <img
              src={getImageUrl(imageUrl)}
              className="border border-primary rounded-2xl w-130 h-130 object-center object-cover hover:cursor-pointer"
              alt={product.name}
            />
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between gap-4 w-full h-130">
          <div>
            <span className="text-primary">{product.category.name} | </span>
            <span className="text-primary">{product.brand.name}</span>

            <div className="mt-6 text-5xl">{product.name}</div>

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
              ${product.price.toFixed(2)}
            </div>

            {/* description */}
            <div className="flex flex-col gap-2 mt-6">
              Description:
              <div className="text-zinc-400 text-sm">{product.description}</div>
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
                {/* {isInFavorites ? (
                  <IconHeartFilled className="size-7 text-primary" />
                ) : ( */}
                <IconHeart className="size-7 text-primary" />
                {/* )} */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* suggested products */}
      <div>
        <div className="flex flex-col gap-8 mt-15">
          <div className="text-3xl">YOU MIGHT ALSO LIKE</div>

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
