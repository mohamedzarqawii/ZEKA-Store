export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  brand: string;
  featured: boolean;
  color: string | null;
  colorCode: string | null;
};
