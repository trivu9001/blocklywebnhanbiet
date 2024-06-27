import axiosClient from "./axiosClient";

export const GetUserList = async () => {
  return await axiosClient.get("User/GetAllUser");
};

export const UpdateAdmin = async (user) => {
  return await axiosClient.put("User/UpdateAdmin", user);
};


export const DeleteUser = async (user) => {
    return await axiosClient.delete("User/DeleteUser", user);
};

export const CreateUser = async(user) => {
  return await axiosClient.post("User/CreateUser", user);
};