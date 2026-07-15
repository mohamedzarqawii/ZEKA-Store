export const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products?populate=*`);

  const data = await response.json();

  return data.data;
}
export async function getProduct(documentId: string) {
  const response = await fetch(
    `${API_URL}/api/products/${documentId}?populate=*`,
  );

  const data = await response.json();

  return data.data;
}

export async function getRelatedProducts(categoryId: number) {
  const response = await fetch(
    `${API_URL}/api/products?filters[category][id][$eq]=${categoryId}&populate=*`,
  );

  const data = await response.json();

  return data.data;
}

export async function getBrands() {
  const response = await fetch(`${API_URL}/api/brands`);

  const data = await response.json();

  return data.data;
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/api/categories`);

  const data = await response.json();

  return data.data;
}
