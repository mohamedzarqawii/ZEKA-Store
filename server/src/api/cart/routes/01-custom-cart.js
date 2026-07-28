export default {
  routes: [
    {
      method: "GET",
      path: "/cart/me",
      handler: "api::cart.cart.getMe", // <-- Explicitly namespace the controller
    },
    {
      method: "POST",
      path: "/cart/add",
      handler: "api::cart.cart.addToCart", // <-- Explicitly namespace the controller
    },
    {
      method: "PUT",
      path: "/cart/update",
      handler: "api::cart.cart.updateCartItem",
    },
    {
      method: "DELETE",
      path: "/cart/remove",
      handler: "api::cart.cart.removeFromCart",
    },
  ],
};
