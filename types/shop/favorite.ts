import * as y from "yup";
import { ProductType } from "../product";

export const favoriteSchema = y.object({
  product: y.number().required(),
  user: y.number().required(),
});

export type reqFavorite = {
  data: {
    product: string;
    user: number;
  };
};

export type FavoriteItem = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product: ProductType;
};

export type ResFavorite = {
  data: FavoriteItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};
