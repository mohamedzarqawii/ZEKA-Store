export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  cart?: {
    productId: number;
    quantity: number;
    size?: number;
  }[];
  wishlist?: { productId: number }[];
};
