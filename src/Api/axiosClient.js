import axios from "axios";
const instance = axios.create({
  baseURL: "https://blocklywebnhanbiet.runasp.net/api/",
  headers: { "Content-Type": "application/json" },
});
//custom header truyen vao token
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (!config.headers.Authorization && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.cancelToken = axios.CancelToken.source().token;
  return config;
});
//lay ve du lieu dang nhap nguoi dung
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  // nếu sai thì remove thông tin đăng nhập và quay lại trang login
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("type");
      window.location.href("/login");
    } //xuất ra lỗi
    return Promise.reject(error);
  }
);
export default instance;
