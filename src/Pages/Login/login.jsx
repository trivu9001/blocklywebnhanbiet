import { React, useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./login.css";
import { LoginGoogle, LoginByAccount } from "../../Api/authenticate";
import { UserContext } from "../../Contexts/UserContext";
const Login = () => {
  const { LoginContext } = useContext(UserContext);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  const handleAdminLogin = async () => {
    const { username, password } = adminCredentials;
    const res = await LoginByAccount(username, password);
    console.log(res);
    if (res.resultCode === 0) {
      LoginContext(
        res.data.email,
        res.data.token,
        res.data.type,
        res.data.fullname
      );
      if (res.data.type == 1) {
        navigate("/dashboard");
      }
    } else {
      toast.error(res.message);
    }
  };
  const handleGoogleLogin = async (idToken) => {
    try {
      const res = await LoginGoogle(idToken);
      if (res.resultCode === 0) {
        LoginContext(
          res.data.email,
          res.data.token,
          res.data.type,
          res.data.fullname
        );
        navigate("/home");
      } else {
        toast.error("Đăng nhập bằng Google thất bại!!!");
      }
    } catch (error) {
      console.log("Lỗi");
    }
  };
  const handleGoogleSuccess = (userInfo) => {
    handleGoogleLogin(userInfo.credential);
  };

  const handleGoogleFailure = (response) => {
    console.error("Google login failed:", response);
  };

  return (
    <>
      <div className="Login">
        <div className="main">
          <h1>Web nhận biết</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={adminCredentials.username}
              onChange={handleInputChange}
              placeholder="Enter your Username"
              required=""
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={adminCredentials.password}
              onChange={handleInputChange}
              placeholder="Enter your Password"
              required=""
            />
            <div className="wrap">
              <button onClick={handleAdminLogin}>Đăng nhập admin</button>
            </div>
            <h2>Lưu ý: Phụ huynh và học sinh sử dụng Google để đăng nhập</h2>
            <div className="btn-gg">
              <GoogleLogin
                buttonText="Signin with Google"
                clientId={
                  "52589092639-rmsjs7ofg66kunin0cel5q2r5co7j31d.apps.googleusercontent.com"
                }
                onFailure={handleGoogleFailure}
                onSuccess={handleGoogleSuccess}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
