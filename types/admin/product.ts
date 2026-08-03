import * as y from "yup";
import { ProductType } from "../product";

export const CreateProductSchema = y.object({
  name: y.string().required(),
  description: y.string(),
  price: y.number().required(),
  stock: y.number().required(),
  category: y.string(),
  brand: y.string(),
});

export type ReqCreateProductType = y.InferType<typeof CreateProductSchema>;

// export type ReqUpdateProductType = {
//   data: {
//     id: number;
//     documentId: string;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;

//     images: {
//       id: number;
//       url: string;
//     }[];

//     category: {
//       id: number;
//       name: string;
//     };

//     brand: {
//       id: number;
//       name: string;
//     };

//     featured: boolean;
//     isFavorite: boolean;
//     favoriteDocId: string | null;
//   };
// };
