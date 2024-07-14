import axiosClient from "./axiosClient";

export const GetUserList = async (pageIndex, pageSize) => {
  return await axiosClient.get(`User/GetAllUser?pagesize=${pageSize}&pagenumb=${pageIndex}`);
};

export const UpdateAdmin = async (user) => {
  return await axiosClient.put("User/UpdateAdmin", user);
};


export const DeleteUser = async (userId) => {
    return await axiosClient.delete(`User/DeleteUser?deleteid=${userId}`);
};
