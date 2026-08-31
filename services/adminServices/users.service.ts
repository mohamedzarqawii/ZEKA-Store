// import API_ROUTES from "@/constants/api-routes";
// import { Users } from "@/features/dashboard/pages/users/columns";
// import api from "@/lib/axios";

// // -------------------- getUsers --------------------

// export const getUsersAdmin = async () => {
//   const { data } = await api.get(API_ROUTES.admin.getUsers);
//   return data;
// };

// // -------------------- updateUser --------------------

// export const updateUserAdmin = async (
//   userId: string,
//   updatedData: Partial<Users>,
// ) => {
//   const { data } = await api.put(
//     API_ROUTES.admin.updateUser(userId),
//     updatedData,
//   );

//   return data;
// };

// // -------------------- deleteUser --------------------

// export const deleteUserAdmin = async (userId: string) => {
//   const { data } = await api.delete(API_ROUTES.admin.deleteUser(userId));
//   return data;
// };

// // -------------------- block User --------------------

// export const blockUserAdmin = async (userId: string) => {
//   const { data } = await api.put(API_ROUTES.admin.blockUser(userId), {
//     blocked: true,
//   });
//   return data;
// };

// // -------------------- Unblock User --------------------
// export const unblockUserAdmin = async (userId: string) => {
//   const { data } = await api.put(API_ROUTES.admin.blockUser(userId), {
//     blocked: false,
//   });
//   return data;
// };
