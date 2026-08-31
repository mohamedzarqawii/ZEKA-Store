import { ProductType } from "./product";

export type CartItemType = {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  product: ProductType;
};
