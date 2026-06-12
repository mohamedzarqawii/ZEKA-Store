export type OrderType = {
  id: string;
  createdAt: Date;
  products: {
    productId: number;
    quantity: number;
    size?: number;
  }[];
};
