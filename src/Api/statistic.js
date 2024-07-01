import axiosClient from "./axiosClient";

export const GetStatistic = async () => {
  return await axiosClient.get(`Statistic`);
};
