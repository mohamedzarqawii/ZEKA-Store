const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getImageUrl = (url: string) => {
  return `${API_URL}${url}`;
};
