const API_ROUTES = {
  uploadMedia: "/api/upload",
  auth: {
    login: "/api/auth/local",
    signup: "/api/auth/local/register",
    emailConfirmation: "api/auth/send-email-confirmation",
    deleteAccount: (userId: string) => `/api/users/${userId}`,
    resetPassword: "/api/auth/change-password",
  },
  profile: {
    get: "/api/users/me",
    update: (userId: number) => `/api/users/${userId}?populate=cart,favorite`,
  },

  shop: {
    getProducts: "/api/products",
    getProduct: (productId: string) => `/api/products/${productId}?populate=*`,
    getRelatedProductsByCategory: (categoryId: number) =>
      `/api/products?filters[category][id][$eq]=${categoryId}&populate=*`,
    getRelatedProductsByBrand: (brandId: number) =>
      `/api/products?filters[category][id][$eq]=${brandId}&populate=*`,
    getBrands: "/api/brands",
    getCategories: "/api/categories",

    getPageNumber: "/api/products/meta",
  },

  cart: {
    add: (userId: number) => `/api/users/${userId}`,
    remove: (userId: number) => `/api/users/${userId}`,
  },

  favorite: {
    get: "/api/favorites",

    add: "/api/favorites",

    remove: "/api/favorites/remove-by-product",

    update: (userId: string) => `/api/users/${userId}`,
  },

  admin: {
    getUsers: "/api/users",
    blockUser: (userId: string) => `/api/users/${userId}`,
    deleteUser: (userId: string) => `/api/users/${userId}`,
    updateUser: (userId: string) => `/api/users/${userId}`,

    getProducts: "/api/products",
    getProduct: (productDocId: string) =>
      `/api/products/${productDocId}?populate=*`,
    updateProduct: (productDocId: string) => `/api/products/${productDocId}`,
    deleteProduct: (productDocId: string) => `/api/products/${productDocId}`,
    createProduct: "/api/products",

    categories: "/api/categories",
    brands: "/api/brands",
  },
};

export default API_ROUTES;
