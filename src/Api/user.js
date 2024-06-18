import axiosClient from "./axiosClient";

export const GetMe = async () => {
  return await axiosClient.get("User/GetUser");
};

export const UpdateMe = async (user) => {
  return await axiosClient.put("User/UpdateUser", user);
};
