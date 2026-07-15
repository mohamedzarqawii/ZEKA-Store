import products from "@/data/products";

const STRAPI_URL = "http://localhost:1337";
const TOKEN =
  "9ad920584f74c3ebebca3ca5680626745daea841b3c577052c522c55e0de8670614ac6ad9bfb41eac64f598bca31588a7651dda580172543677dc8a1cbcbfcea4574caeda99adab68ff2d444bafee512cdad35ed764a0e60dc1654feaf8a8fff047c79f15ad742beee47eec54fbdbe469e0bd2cc5f44874a31977e92ecc76ded";

async function seedProducts() {
  try {
    for (const product of products) {
      const response = await fetch(`${STRAPI_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock,
            brand: product.brand,
          },
        }),
      });

      if (!response.ok) {
        console.log(`Failed: ${product.name}`);
        continue;
      }

      console.log(`Added: ${product.name}`);
    }

    console.log("Finished");
  } catch (error) {
    console.error(error);
  }
}

seedProducts();
