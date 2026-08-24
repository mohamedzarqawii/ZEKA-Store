const { createStrapi } = require("@strapi/strapi");

(async () => {
  const app = await createStrapi().load();

  console.log("PRODUCT UID:", app.getModel("api::product.product"));

  console.log("PRODUCT SERVICE:", app.service("api::product.product"));

  console.log(
    "PRODUCT SERVICE FIND:",
    app.service("api::product.product")?.find,
  );

  await app.destroy();
})();
