/**
 * favorite controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::favorite.favorite", () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    return {
      data: data.map((favorite) => ({
        ...favorite,
        product: {
          ...favorite.product,
          isFavorite: true,
        },
      })),
      meta,
    };
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);

    return {
      data: {
        ...data,
        product: {
          ...data.product,
          isFavorite: true,
        },
      },
      meta,
    };
  },
}));
