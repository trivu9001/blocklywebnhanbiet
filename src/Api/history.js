import axiosClient from "./axiosClient";

export const GetHistory = async (pageIndex, pageSize) => {
  return await axiosClient.get(
    `HistoryPractice/GetHistoryPracticePage?pagesize=${pageSize}&pagenumb=${pageIndex}`
  );
};

export const GetDetailHistoryById = async (id) => {
  return await axiosClient.get(
    `HistoryPracticeDetail/GetHistoryPracticeDetailOfHist?historypractice_id=${id}`
  );
};
