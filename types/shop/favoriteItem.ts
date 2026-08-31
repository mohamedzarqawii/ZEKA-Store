import { ProductType } from "./product";

export type FavoriteItem = {
  id: number;
  userId: string;
  productId: number;
  product: ProductType;
};
