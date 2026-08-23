import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

api.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    // عدم إرسال الـ Token إذا كان الطلب موجه لمسارات تسجيل الدخول أو إنشاء حساب
    const isAuthRequest = config.url?.includes("/api/auth/local");

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default api;
