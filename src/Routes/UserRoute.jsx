import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (token === null || email === null) {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default UserRoute;
