"use client";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import ProductCard from "@/features/shop/components/ProductCard";
import { useGetFavorites, useToggleFavorites } from "./hooks/useFavorites";

const FavoritesPage = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: favoritesData = [] } = useGetFavorites(currentUser?.id);

  return (
    <div>
      {favoritesData.length === 0 ? (
        <div className="flex flex-col justify-center h-[calc(100vh-155px)]">
          {/* 1 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-primary text-3xl">
              YOUR FAVORITES LOOK EMPTY !
            </div>
            <div className="text-xl">WHAT ARE YOU WAITING FOR?</div>
            <a
              href="/shop"
              className="bg-primary hover:bg-secondary mt-4 px-4 py-4 rounded-lg font-extrabold text-center transition-colors duration-300 hover:cursor-pointer"
            >
              START SHOPPING NOW !
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-primary text-3xl">FAVORITES</div>

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {favoritesData.map((favorite, i) => (
              <ProductCard key={favorite.id} product={favorite.product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
