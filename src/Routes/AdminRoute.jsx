import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Header from "../Pages/Dashboard/Header";
const AdminRoute = ({ children }) => {
  const { LogoutContext } = useContext(UserContext);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const type = sessionStorage.getItem("type");
  const fullname = sessionStorage.getItem("fullname");

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  useEffect(() => {
    if (token !== null || type === 1) {
      navigate("/dashboard");
    } else {
      LogoutContext();
      navigate("/login");
    }
  }, []);
  return (
    <>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    /> 
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        {children}
      </div>
    </>
  );
};

export default AdminRoute;
