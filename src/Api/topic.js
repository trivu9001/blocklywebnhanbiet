import axiosClient from "./axiosClient";

export const GetAllTopic = async () => {
  return await axiosClient.get("topic/getalltopic");
};

export const GetDetailTopic = async (id) => {
  return await axiosClient.get(
    `detailtopic/getalldetailtopicbytopicid?topic_id=${id}`
  );
};
