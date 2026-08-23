import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { ReqUploadMediaType, ResUploadMediaType } from "@/types/uploadMedia";

// -------------- upload media --------------

export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append("files", file);

  const { data } = await api.post<ResUploadMediaType>(
    API_ROUTES.uploadMedia,
    formData,
  );
  return data;
};
