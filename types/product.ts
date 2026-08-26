export type ProductType = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  images: string[];

  category: {
    id: number;
    name: string;
  };

  brand: {
    id: number;
    name: string;
  };

  featured: boolean;
  isFavorite: boolean;
  favoriteDocId: string | null;
};
