/**
 * favorite controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::favorite.favorite",
  ({ strapi }) => ({
    // 1. جلب الكل مع إضافة علم المفضلة للمنتج
    async find(ctx) {
      const { data, meta } = (await super.find(ctx)) as any;

      return {
        data: data.map((favorite: any) => ({
          ...favorite,
          product: favorite.product
            ? {
                ...favorite.product,
                isFavorite: true,
              }
            : null,
        })),
        meta,
      };
    },

    // 2. جلب عنصر واحد مع إضافة علم المفضلة للمنتج
    async findOne(ctx) {
      const { data, meta } = (await super.findOne(ctx)) as any;

      return {
        data: data
          ? {
              ...data,
              product: data.product
                ? {
                    ...data.product,
                    isFavorite: true,
                  }
                : null,
            }
          : null,
        meta,
      };
    },

    // 3. الدالة الجديدة: الحذف باستخدام الـ productId بدلاً من الـ documentId
    async removeByProductId(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("يجب تسجيل الدخول أولاً");

      const { productId } = ctx.request.body;
      if (!productId) return ctx.badRequest("حقل productId مطلوب");

      try {
        // البحث عن عنصر المفضلة الذي يربط بين هذا المستخدم وهذا المنتج تحديداً
        const favoriteItem = (await strapi.db
          .query("api::favorite.favorite")
          .findOne({
            where: {
              user: user.id,
              product: productId,
            },
          })) as any;

        // إذا لم يكن المنتج موجوداً في المفضلة أساساً
        if (!favoriteItem) {
          return ctx.notFound("هذا المنتج غير موجود في قائمة مفضلتك");
        }

        // حذف العنصر من قاعدة البيانات باستخدام الـ id الخاص به
        await strapi.entityService.delete(
          "api::favorite.favorite",
          favoriteItem.documentId,
        );

        // هنا نقوم بتغيير الـ status يدوياً إلى 200 وإرسال الـ body
        ctx.status = 200;
        return ctx.send({
          success: true,
          message: "تم إزالة المنتج من المفضلة بنجاح",
        });
      } catch (err: any) {
        return ctx.badRequest("حدث خطأ أثناء محاولة إزالة المنتج من المفضلة", {
          error: err.message,
        });
      }
    },
  }),
);
