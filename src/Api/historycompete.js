import axiosClient from "./axiosClient";

export const GetHistoryCompete = async (pageIndex, pageSize) => {
  return await axiosClient.get(
    `HistoryCompete/GetHistoryCompetePage?pagesize=${pageSize}&pagenumb=${pageIndex}`
  );
};

export const GetDetailHistoryCompeteById = async (id) => {
  return await axiosClient.get(
    `HistoryCompeteDetail/GetHistoryCompeteDetailOfHist?historypractice_id=${id}`
  );
};
