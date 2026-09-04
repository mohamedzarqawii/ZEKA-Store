"use client";

import { Heart } from "@/components/animate-ui/icons/heart";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";
import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import {
  useGetFavorites,
  useToggleFavorites,
} from "@/features/profile/pages/favorites/hooks/useFavorites";
import { FavoriteItem } from "@/types/shop/favoriteItem";

import { ProductType } from "@/types/shop/product";
import Link from "next/link";
import { toast } from "sonner";

const ItemCart = ({ product }: { product: ProductType }) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: favorites = [], isLoading: isLoadingFavorites } =
    useGetFavorites(currentUser?.id);
  const { mutate: toggleFavorites, isPending: isToggleFavorite } =
    useToggleFavorites();

  // -----------------------------------
  const favoriteItem = favorites.find(
    (item: FavoriteItem) => item.productId === product.id,
  );
  const isInFavorite = !!favoriteItem;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentUser?.id) {
      toast.error("Please login to manage you favorites", { richColors: true });
      return;
    }

    toggleFavorites({
      userId: currentUser.id,
      productId: product.id,
    });
  };

  return (
    <div className="flex justify-between items-center gap-5 bg-[#1a1a1a]/20 backdrop-blur-md p-7 border border-primary rounded-3xl">
      {/* 1 */}

      <Link href={`/shop/${product.id}`} className="block">
        <div className="flex items-center gap-5">
          {/* image */}

          <img
            src={product?.images[0]}
            alt={product.name}
            className="rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
          />

          {/* content */}

          <div className="flex flex-col gap-1">
            <div>{product.name}</div>
            {/* price */}
            <div className="min-w-3 font-bold text-primary text-sm">
              ${product?.price}
            </div>
          </div>
        </div>
      </Link>
      {/* 2 */}
      <div className="flex justify-between items-center gap-3">
        {/* Counter */}
        <Counter
          product={product}
          classname="flex justify-between items-center p-1 bg-zinc-700 h-8 rounded-md w-21 "
          plusClass="flex justify-center items-center px-2 py-1 hover:cursor-pointer"
          minusClass="flex justify-center items-center px-2 py-1"
          spanClass="mx-auto select-none"
          trashSize="size-4 text-primary"
        />

        <Button
          variant="none"
          size="none"
          onClick={handleFavoriteClick}
          className="flex justify-between items-center bg-zinc-700 p-2 rounded-md"
        >
          {isToggleFavorite ? (
            <AnimateIcon loop animateOnView loopDelay={100}>
              <Heart
                className="size-4 text-primary cursor-pointer"
                animation="path"
              />
            </AnimateIcon>
          ) : isInFavorite ? (
            <AnimateIcon animateOnView>
              <Heart
                className="size-4 text-primary cursor-pointer"
                animation="fill"
              />
            </AnimateIcon>
          ) : (
            <Heart className="size-4 text-primary cursor-pointer" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ItemCart;
