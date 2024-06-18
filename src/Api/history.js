import axiosClient from "./axiosClient";

export const GetHistory = async () => {
  return await axiosClient.get("HistoryPractice/GetHistoryPracticeOfCurUser");
};
