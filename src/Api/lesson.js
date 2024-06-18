import axiosClient from "./axiosClient";

export const GetLessons = async (id) => {
  return await axiosClient.get(
    `Excercise/GetAllExcerciseByDetailTopicId?ex_id=${id}`
  );
};

export const GetExcerciseById = async (id) => {
  return await axiosClient.get(
    `DetailExcercise/GetAllDetailExcerciseByExId?ex_id=${id}`
  );
};

export const CheckAnswer = async (answer) => {
  return await axiosClient.post(`CheckAnswer/SubmitCheckAnswer`, answer);
};

export const StartPractice = async (id) => {
  return await axiosClient.post(
    "HistoryPractice/InsertHistoryPracticeOfCurUserStart",
    id
  );
};

export const EndPractice = async (hisId, numb) => {
  return await axiosClient.post(
    `HistoryPractice/InsertHistoryPracticeOfCurUserEnd?histId=${hisId}&numb=${numb}`
  );
};
