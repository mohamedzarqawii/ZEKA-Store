const API_ROUTES = {
  auth: {
    login: "/api/auth/local",
    signup: "/api/auth/local/register",
    emailConfirmation: "api/auth/send-email-confirmation",
    deleteAccount: (userId: number) => `/api/users/${userId}`,
    resetPassword: "/api/auth/change-password",
  },
  profile: {
    get: "/api/users/me",
    update: (userId: number) => `/api/users/${userId}?populate=cart,favorite`,
  },

  shop: {
    getProducts: "/api/products",
    getProduct: (productId: string) => `/api/products/${productId}?populate=*`, //send -documentId-
    getRelatedProductsByCategory: (categoryId: number) =>
      `/api/products?filters[category][id][$eq]=${categoryId}&populate=*`,
    getRelatedProductsByBrand: (brandId: number) =>
      `/api/products?filters[category][id][$eq]=${brandId}&populate=*`,
    getBrands: "/api/brands",
    getCategories: "/api/categories",

    getPageNumber: "/api/products/meta",
  },

  // cart: {
  //   add: (userId: number) => `/api/users/${userId}`,
  //   remove: (userId: number) => `/api/users/${userId}`,
  // },

  favorite: {
    get: "/api/favorites",

    add: "/api/favorites",

    remove: (favoriteDocId: string) => `/api/favorites/${favoriteDocId}`,
  },
};

export default API_ROUTES;
