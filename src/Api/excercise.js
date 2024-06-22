import axiosClient from "./axiosClient";

export const GetAllExcercise = async () => {
  return await axiosClient.get("Excercise/GetAllExcercise");
};

export const GetExcerciseBySearch = async (search) => {
  return await axiosClient.get(
    `Excercise/GetAllExcerciseByDescription?search=${search}`
  );
};

export const GetAllDetailExcercise = async () => {
  return await axiosClient.get("DetailExcercise/GetAllDetailExcercise");
};
