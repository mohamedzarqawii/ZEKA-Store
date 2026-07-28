export default {
  routes: [
    {
      method: "DELETE",
      path: "/favorite/remove-by-product",
      handler: "api::favorite.favorite.removeByProductId",
    },
  ],
};
