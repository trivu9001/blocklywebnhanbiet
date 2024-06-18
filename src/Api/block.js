import axiosClient from "./axiosClient";
//gọi api lấy các block define json từ server
export const GetAllDefineBlock = async () => {
  return await axiosClient.get("Blockly/GetAllBlocklyDefine");
};
