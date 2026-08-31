"use client";

import { Heart } from "@/components/animate-ui/icons/heart";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";
import { FavoriteItem } from "@/types/favoriteItem";
import { ProductType } from "@/types/product";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../../components/ProductCard";
import {
  useGetShopProduct,
  useGetShopRelatedProductsByCategory,
} from "./hooks/useShop";

interface ViewProps {
  productId: string;
}

const ProductPage = ({ productId }: ViewProps) => {
  const [rating, setRating] = useState(3);

  const {
    data: product,
    isLoading: isProductLoading,
    refetch: reGetProduct,
  } = useGetShopProduct(Number(productId));

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: cart = [], refetch: reGetCart } = useGetCart(currentUser?.id);
  const { mutateAsync: toggleCart, isPending } = useToggleCart();

  // ------------- get related product by category -------------
  const {
    data: relatedProducts = [],
    isLoading: isRelatedCategoryLoading,
    refetch: reGetRelatd,
  } = useGetShopRelatedProductsByCategory(product?.category?.id);

  // -----------------------------------------------------------
  const cartItem = cart.find((item) => item.productId === product?.id);
  console.log(cartItem);
  const isInCart = !!cartItem;

  const handleCartClick = async (
    e: React.MouseEvent,
    action: "add" | "decrease",
  ) => {
    e.preventDefault(); // منع فتح الرابط عند الضغط على الزر

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart", {
        position: "bottom-right",
        richColors: true,
      });
      return;
    }

    if (!product) {
      toast.error("Faild to get cart", {
        position: "bottom-right",
        richColors: true,
      });
      return;
    }

    await toggleCart({
      userId: currentUser.id,
      productId: product.id,
      action: action,
    });

    await Promise.all([reGetCart(), reGetProduct(), reGetRelatd()]);
  };

  // ------------- handle change images -------------

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageUrl =
    selectedImage || product?.images?.[0] || "/images/placeholder.jpeg";

  const handleChangeImage = (url: string) => {
    setSelectedImage(url);
  };

  // ------------- handle favorites -------------

  const { data: favorites = [] } = useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product?.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites", {
        position: "bottom-right",
        richColors: true,
      });
      return;
    }

    if (!product) {
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center gap-2 h-[calc(100vh-155px)] text-primary text-4xl">
        {/* 1 */}
        <Spinner className="size-8" data-icon="inline-start" />
        <div className="text-primary text-3xl">Loading Product . . .</div>
      </div>
    );
  }

  if (!product) return;
  return (
    <div className="mx-10 my-15">
      <div className="flex items-center gap-6 w-full h-fit">
        {/* left */}
        <div className="relative flex gap-8 w-full max-w-155">
          <div className="flex flex-col gap-4 rounded-2xl w-31 h-130 overflow-y-auto no-scrollbar">
            {product?.images?.length ? (
              product.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  onClick={() => handleChangeImage(image)}
                  className="border border-primary rounded-2xl w-full h-25 object-center object-cover hover:cursor-pointer"
                  alt={product.name}
                />
              ))
            ) : (
              <img
                src="/images/placeholder.jpeg"
                className="border border-primary rounded-2xl w-full h-25 object-center object-cover"
                alt={product?.name}
              />
            )}
          </div>

          <div className="w-full max-w-130">
            {!isProductLoading ? (
              <img
                src={imageUrl}
                className="border border-primary rounded-2xl w-full max-w-130 h-130 object-center object-cover hover:cursor-pointer"
                alt={product?.name}
              />
            ) : null}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between gap-4 w-full h-130">
          <div className="w-full">
            <span className="text-primary uppercase">
              {product?.category?.name || "Uncategorized"} |{" "}
            </span>
            <span className="text-primary uppercase">
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

            {product.stock < 5 && product.stock > 0 ? (
              <div className="flex items-center gap-2 mt-6 text-primary">
                {product?.stock}
                <div className="text-sm">Left in stock</div>
              </div>
            ) : null}

            {product.stock == 0 ? (
              <div className="flex items-center gap-2 mt-6 text-primary">
                <div className="text-destructive text-sm">Out of stock</div>
              </div>
            ) : null}

            {product.stock == cartItem?.quantity ? (
              <div className="flex items-center gap-2 mt-6 text-primary">
                <div className="text-destructive text-sm">
                  Maximum items added in cart
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-between items-center gap-3 w-full">
            <div className="flex items-center w-full">
              {/* Counter or Add to Cart */}

              {isInCart && cartItem ? (
                <Counter
                  product={cartItem.product}
                  classname="flex justify-between items-center bg-primary h-20 rounded-2xl w-full text-lg text-center hover:cursor-pointer"
                  plusClass={`flex justify-center items-center px-10 py-6 h-full rounded-r-2xl rounded-l-[0] text-lg hover:cursor-pointer`}
                  minusClass="flex justify-center items-center px-10 py-6 h-full rounded-l-2xl rounded-r-[0] text-lg hover:cursor-pointer"
                  spanClass="mx-auto text-lg select-none py-6"
                  trashSize="size-5"
                />
              ) : (
                <Button
                  size={"none"}
                  className="bg-primary hover:bg-secondary px-4 py-6 rounded-2xl w-full h-20 text-lg text-center"
                  onClick={(e) => {
                    handleCartClick(e, "add");
                  }}
                  disabled={(product.stock == 0, isPending)}
                >
                  {isPending ? (
                    <span className="flex justify-center items-center gap-2">
                      <Spinner data-icon="inline-start" />
                    </span>
                  ) : (
                    "ADD TO CART"
                  )}
                </Button>
              )}
            </div>
            {/* add to favorites button */}
            <Button
              variant={"outline"}
              onClick={handleFavoriteClick}
              className="px-6 py-6 border border-primary rounded-2xl h-20 text-lg cursor-pointer"
            >
              {isToggleFavorite ? (
                <AnimateIcon loop animateOnView loopDelay={100}>
                  <Heart
                    className="size-7 text-primary cursor-pointer"
                    animation="path"
                  />
                </AnimateIcon>
              ) : isInFavorite ? (
                <AnimateIcon animateOnView>
                  <Heart
                    className="size-7 text-primary cursor-pointer"
                    animation="fill"
                  />
                </AnimateIcon>
              ) : (
                <Heart className="size-7 text-primary cursor-pointer" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* suggested products */}
      <div>
        <div className="flex flex-col gap-8 mt-15">
          <div className="text-primary text-3xl uppercase">
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
