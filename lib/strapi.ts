export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export function getStrapiMedia(url: string) {
  return `${STRAPI_URL}${url}`;
}
