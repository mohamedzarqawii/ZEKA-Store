import { AddressType } from "./address";
import { OrderType } from "./order";
import { ProductType } from "./product";

export type User = {
  id: string;
  first_name: string;
  last_name: string;
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
  addresses: AddressType[];
  role?: string;
};
