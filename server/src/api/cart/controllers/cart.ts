/**
 * cart controller
 */

import { factories } from "@strapi/strapi";

// دالة مساعدة مستقلة خارج الكائن لتجنب تعارض الـ Types مع Strapi
async function getOrCreateUserCart(strapi: any, userId: number) {
  let cart = (await strapi.db.query("api::cart.cart").findOne({
    where: { user: userId },
    populate: { cart_items: { populate: { product: true } } },
  })) as any;

  if (!cart) {
    cart = await strapi.entityService.create("api::cart.cart", {
      data: {
        user: userId,
        publishedAt: new Date().toISOString(),
      } as any,
      populate: { cart_items: true },
    });
  }
  return cart;
}

export default factories.createCoreController(
  "api::cart.cart",
  ({ strapi }) => ({
    // 0. جلب سلة المستخدم الحالي مع كافة منتجاتها
    async getMe(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("يجب تسجيل الدخول أولاً لعرض السلة");

      try {
        const cart = await getOrCreateUserCart(strapi, user.id);
        return ctx.send({ data: cart });
      } catch (err: any) {
        return ctx.badRequest("حدث خطأ أثناء جلب السلة الخاصة بك", {
          error: err.message,
        });
      }
    },

    // 1. إضافة منتج إلى السلة أو زيادة الكمية إذا كان موجوداً بالفعل
    async addToCart(ctx) {
      const user = ctx.state.user;
      if (!user)
        return ctx.unauthorized(
          "يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة",
        );

      const { productId, quantity = 1 } = ctx.request.body;
      if (!productId) return ctx.badRequest("معرّف المنتج (productId) مطلوب");

      try {
        const cart = await getOrCreateUserCart(strapi, user.id);

        // التحقق مما إذا كان المنتج موجوداً مسبقاً في السلة
        const existingCartItem = cart.cart_items?.find(
          (item: any) => item.product && item.product.id === Number(productId),
        );

        if (existingCartItem) {
          // إذا كان موجوداً، نقوم بزيادة الكمية فقط
          const updatedItem = await strapi.entityService.update(
            "api::cart-item.cart-item",
            existingCartItem.id,
            {
              data: {
                quantity: existingCartItem.quantity + Number(quantity),
              },
            },
          );
          return ctx.send({
            message: "تم تحديث الكمية في السلة بنجاح",
            data: updatedItem,
          });
        } else {
          // إذا لم يكن موجوداً، ننشئ عنصر سلة جديد ونربطه بالسلة والمنتج
          const newCartItem = await strapi.entityService.create(
            "api::cart-item.cart-item",
            {
              data: {
                quantity: Number(quantity),
                product: productId,
                cart: cart.id,
                publishedAt: new Date().toISOString(),
              } as any,
            },
          );
          return ctx.send({
            message: "تم إضافة المنتج إلى السلة بنجاح",
            data: newCartItem,
          });
        }
      } catch (err: any) {
        return ctx.badRequest("حدث خطأ أثناء إضافة المنتج إلى السلة", {
          error: err.message,
        });
      }
    },

    // 2. تحديث كمية عنصر معين داخل السلة
    async updateCartItem(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("يجب تسجيل الدخول أولاً");

      const { cartItemId, quantity } = ctx.request.body;
      if (!cartItemId || quantity === undefined) {
        return ctx.badRequest("الحقول cartItemId و quantity مطلوبة");
      }

      if (Number(quantity) <= 0) {
        return ctx.badRequest(
          "يجب أن تكون الكمية أكبر من 0. لحذف المنتج استخدم رابط الحذف.",
        );
      }

      try {
        // فحص أمان: التأكد من أن عنصر السلة يخص المستخدم الحالي فعلياً
        const cartItem = (await strapi.entityService.findOne(
          "api::cart-item.cart-item",
          cartItemId,
          {
            populate: { cart: { populate: { user: true } } },
          },
        )) as any;

        if (!cartItem || cartItem.cart?.user?.id !== user.id) {
          return ctx.forbidden("ليس لديك الصلاحية لتعديل هذا العنصر");
        }

        const updatedItem = await strapi.entityService.update(
          "api::cart-item.cart-item",
          cartItemId,
          {
            data: { quantity: Number(quantity) },
          },
        );

        return ctx.send({
          message: "تم تحديث كمية العنصر بنجاح",
          data: updatedItem,
        });
      } catch (err: any) {
        return ctx.badRequest("حدث خطأ أثناء تحديث الكمية", {
          error: err.message,
        });
      }
    },

    // 3. حذف عنصر نهائياً من السلة
    async removeFromCart(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("يجب تسجيل الدخول أولاً");

      const { cartItemId } = ctx.request.body;
      if (!cartItemId) return ctx.badRequest("حقل cartItemId مطلوب");

      try {
        // فحص أمان: التأكد من أن العنصر يخص سلة المستخدم الحالي
        const cartItem = (await strapi.entityService.findOne(
          "api::cart-item.cart-item",
          cartItemId,
          {
            populate: { cart: { populate: { user: true } } },
          },
        )) as any;

        if (!cartItem || cartItem.cart?.user?.id !== user.id) {
          return ctx.forbidden("ليس لديك الصلاحية لحذف هذا العنصر");
        }

        await strapi.entityService.delete(
          "api::cart-item.cart-item",
          cartItemId,
        );

        return ctx.send({ message: "تم إزالة المنتج من السلة بنجاح" });
      } catch (err: any) {
        return ctx.badRequest("حدث خطأ أثناء إزالة المنتج من السلة", {
          error: err.message,
        });
      }
    },
  }),
);
