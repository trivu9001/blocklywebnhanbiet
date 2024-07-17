import axiosClient from "./axiosClient";

export const GetRankByTimeAndLesson = async (pageIndex, pageSize) => {
  return await axiosClient.get(
    `Ranking/GetRankByTimeAndLesson?pagesize=${pageSize}&pagenumb=${pageIndex}`
  );
};

export const GetRankByTimeAndPoint = async (pageIndex, pageSize) => {
  return await axiosClient.get(
    `Ranking/GetRankQuizzByTimeAndPoint?pagesize=${pageSize}&pagenumb=${pageIndex}`
  );
};
