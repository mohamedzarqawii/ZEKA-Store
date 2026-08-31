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
import { FavoriteItem } from "@/types/favoriteItem";
import { ProductType } from "@/types/product";
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

          <div className="relative flex flex-col justify-center items-center">
            <img
              src={product?.images[0]}
              alt={product.name}
              className="rounded-2xl w-25 h-25 object-center object-cover hover:cursor-pointer"
            />

            {/* Counter */}
            <Counter
              product={product}
              classname="center -bottom-4.5 absolute flex  items-center border border-primary bg-primary/90 h-7 min-w-19 rounded-md max-w-20"
              plusClass="flex justify-center items-center pr-2 py-0.5 hover:cursor-pointer"
              minusClass="flex justify-center items-center pl-2 py-0.5 hover:cursor-pointer"
              spanClass="mx-auto select-none"
              trashSize="size-4  flex justify-center items-center hover:cursor-pointer "
            />
          </div>
          {/* content */}

          <div className="flex flex-col gap-1">
            <div>{product.name}</div>
            {/* <div className="flex gap-2 text-muted-foreground text-xs">
              <div>Delete |</div>
              <div>Save for later |</div>
              <div>Share</div>
            </div> */}
          </div>
        </div>
      </Link>
      {/* 2 */}
      <div className="flex justify-between items-center gap-4">
        {/* price */}
        <div className="min-w-3 font-bold text-xl">${product?.price}</div>

        <Button
          variant="none"
          size="none"
          onClick={handleFavoriteClick}
          className="flex justify-between items-center bg-zinc-700 p-1 rounded-md"
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
      </div>
    </div>
  );
};

export default ItemCart;
