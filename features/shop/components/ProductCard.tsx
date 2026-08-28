"use client";
import Link from "next/link";
import { ProductType } from "@/types/product";
import {
  IconHeartFilled,
  IconHeart,
  IconShoppingCartPlus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { Heart } from "../../../components/animate-ui/icons/heart";

import { Badge } from "@/components/ui/badge";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { useGetCart, useToggleCart } from "@/features/cart/pages/hooks/useCart";
import { toast } from "sonner";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";
import { FavoriteItem } from "@/types/favoriteItem";
import { Spinner } from "@/components/ui/spinner";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import { ProductCardSkeleton } from "./ProductCardSkilton";
import { useGetShopProduct } from "../pages/shop/hooks/useShop";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: cart = [], isLoading: isCartLoading } = useGetCart(
    currentUser?.id,
  );
  const { mutate: toggleCart, isPending: isToggleCart } = useToggleCart();

  const { data: favorites = [], isLoading: isLoadingFavorites } =
    useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  // ------------------------------------
  const cartItem = cart.find((item) => item.productId === product.id);
  console.log(cartItem);
  const isInCart = !!cartItem;

  const handleCartClick = (e: React.MouseEvent, action: "add" | "decrease") => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage your cart");
      return;
    }

    toggleCart({
      userId: currentUser.id,
      productId: product.id,
      action: action,
    });
  };

  // -----------------------------------
  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites");
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  // if (isCartLoading && isLoadingFavorites && isCurrentUserLoading) {
  //   return <ProductCardSkeleton />;
  // }
  return (
    <div>
      <Link href={`/shop/${product.id}`}>
        <div className="group flex flex-col bg-card hover:bg-zinc-900 border border-border hover:border-zinc-600 rounded-2xl w-full h-99 overflow-hidden transition-all duration-300">
          {/* image & cart icon */}

          <div className="relative">
            {/* love icon */}
            <div className="flex flex-col">
              <Button
                variant="none"
                size="none"
                onClick={handleFavoriteClick}
                className="top-4 right-4 absolute p-1.5 rounded-lg transition-transform duration-300 cursor-pointer"
              >
                {isToggleFavorite ? (
                  <AnimateIcon loop animateOnView loopDelay={100}>
                    <Heart
                      className="size-5 text-primary cursor-pointer"
                      animation="path"
                    />
                  </AnimateIcon>
                ) : isInFavorite ? (
                  <AnimateIcon animateOnView>
                    <Heart
                      className="size-5 text-primary cursor-pointer"
                      animation="fill"
                    />
                  </AnimateIcon>
                ) : (
                  <Heart className="size-5 text-primary cursor-pointer" />
                )}
              </Button>

              {/* Out of stock */}
              {product.stock == 0 && (
                <Badge
                  variant={"outline"}
                  className="top-4 left-4 absolute bg-primary/80 p-1.5 border rounded-lg text-[10px] transition-transform duration-300 cursor-pointer"
                >
                  Out of stock
                </Badge>
              )}

              {/* add to cart */}

              <div className="right-3 bottom-3 absolute">
                {isInCart && cartItem ? (
                  <>
                    <Counter
                      product={cartItem.product}
                      classname="flex items-center border border-primary bg-primary/80 h-7 min-w-19 rounded-md max-w-20"
                      plusClass="flex justify-center items-center pr-2 py-0.5 hover:cursor-pointer"
                      minusClass="flex justify-center items-center pl-2 py-0.5 hover:cursor-pointer"
                      spanClass="mx-auto select-none"
                      trashSize="size-4  flex justify-center items-center hover:cursor-pointer "
                    />
                  </>
                ) : (
                  <Button
                    size={"none"}
                    variant={"none"}
                    className="bg-primary/80 p-1.5 border border-primary rounded-lg group-hover:cursor-pointer"
                    onClick={(e) => {
                      handleCartClick(e, "add");
                    }}
                    disabled={product.stock == 0}
                  >
                    <IconShoppingCartPlus className="size-4" />
                  </Button>
                )}
              </div>
            </div>
            {/* image */}
            <img
              src={product.images?.[0] || "/images/placeholder.jpeg"}
              alt={product.name || "Product Image"}
              className="w-full h-64 object-center object-cover hover:cursor-pointer"
            />
          </div>
          {/* content */}
          <div className="flex flex-col justify-between bg-card p-4 h-full">
            <div className="flex flex-col gap-1">
              <div className="text-zinc-400 text-xs">
                {product.brand?.name ? product.brand.name : "No Brand"}
              </div>
              <div className="text-sm line-clamp-2">{product.name}</div>
            </div>

            {/* <p className="text-gray-400 text-xs line-clamp-1">
                {product.brand?.name ? product.brand.name : "No Brand"}
              </p> */}

            <div className="flex justify-between items-center mt-3 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                  <Badge variant={"outline"} className="bg-primary/20!">
                    {product.category?.name
                      ? product.category.name
                      : "No Category"}
                  </Badge>

                  <div className="text-primary text-sm">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
