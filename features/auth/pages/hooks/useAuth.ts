import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth.service";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });
};
