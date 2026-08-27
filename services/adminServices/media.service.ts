import API_ROUTES from "@/constants/api-routes";
import api from "@/lib/axios";
import { supabase } from "@/lib/supabase";
import { ReqUploadMediaType, ResUploadMediaType } from "@/types/uploadMedia";

// -------------- upload media --------------

export const uploadMedia = async (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { data, error } = await supabase.storage
    .from("products media")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("products media").getPublicUrl(data.path);

  return {
    path: data.path,
    url: publicUrl,
  };
};
