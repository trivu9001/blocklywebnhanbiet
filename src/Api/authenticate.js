import axiosClient from "./axiosClient";

//truyen vao token id google de dang nhap cho phu huynh/ hoc sinh
export const LoginGoogle = async (idToken) => {
  const res = await axiosClient.post("googleauthentication/login", {
    idToken: idToken,
  });
  return res;
};
//truyen vao tai khoan mat khau google de dang nhap cho admin
export const LoginByAccount = async (username, password) => {
  const res = await axiosClient.post(
    "authentication/login",
    { userName: username, password: password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};
