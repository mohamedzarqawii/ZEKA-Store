"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    const user = ctx.state.user;

    if (!user) {
      return {
        data: data.map((product) => ({
          ...product,
          isFavorite: false,
        })),
        meta,
      };
    }

    // جلب مفضلات المستخدم
    const favorites = await strapi.db.query("api::favorite.favorite").findMany({
      where: {
        user: user.id,
      },
      populate: {
        product: true,
      },
    });

    // تحويلها إلى Set للبحث السريع
    const favoriteIds = new Set(
      favorites.map((favorite) => favorite.product.documentId),
    );

    // إضافة isFavorite لكل منتج
    return {
      data: data.map((product) => ({
        ...product,
        isFavorite: favoriteIds.has(product.documentId),
        favoriteDocId:
          favorites.find((fav) => fav.product.documentId === product.documentId)
            ?.documentId || null,
      })),
      meta,
    };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);

    const user = ctx.state.user;

    if (!user) {
      return {
        data: {
          ...data,
          isFavorite: false,
        },
      };
    }

    const favorite = await strapi.db.query("api::favorite.favorite").findOne({
      where: {
        user: user.id,
        product: {
          documentId: data.documentId,
        },
      },
    });

    return {
      data: {
        ...data,
        isFavorite: !!favorite,
      },
    };
  },
}));
