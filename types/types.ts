export interface ProductType {
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
}

export interface CartItemType extends ProductType {
  quantity: number; // هنا الخاصية إجبارية لأن العنصر صار بالسلة ومستحيل يكون بالسلة بطلب كميته 0
}
