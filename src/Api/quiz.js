import axiosClient from "./axiosClient";

export const GetAllQuiz = async () => {
  return await axiosClient.get(`Quiz/GetAllQuiz`);
};

// export const StartQuiz = async (id) => {
//   return await axiosClient.post(
//     "HistoryPractice/InsertHistoryCompeteCurUserStart",
//     id
//   );
// };

// export const EndQuiz = async (hisId, numb) => {
//   return await axiosClient.post(
//     `HistoryCompete/InsertHistoryCompeteOfCurUserEnd?histId=${hisId}&numb=${numb}`
//   );
// };
