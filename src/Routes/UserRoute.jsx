import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/header.jsx";
import Footer from "../Components/Footer/footer.jsx";
//component react useroute
const UserRoute = ({ children }) => {
  //khi đăng nhập vào các đường link lấy token và mail trong ssstorage để kiểm tra
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (token === null || email === null) {
      navigate("/login");
    }
  }, []);
  return <>  
  <Header/>
  {children}
  <Footer/></>;
};

export default UserRoute;
