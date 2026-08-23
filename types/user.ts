import { OrderType } from "./order";
import { ProductType } from "./product";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  cart: {
    id: number;
    product: ProductType;
    quantity: number;
  }[];
  favorite: { productId: number }[];
  birthday?: string;
  gender?: "male" | "female";
  orders: OrderType[];
  role?: { name: string };
};
