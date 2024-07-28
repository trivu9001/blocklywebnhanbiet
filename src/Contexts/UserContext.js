import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    const type = sessionStorage.getItem("type");
    const fullname = sessionStorage.getItem("fullname");
    if (
      token !== null &&
      email !== null &&
      type !== null &&
      fullname !== null
    ) {
      setUser({ token, email, type, fullname });
    }
  }, []);
  const LoginContext = (email, token, type, fullname) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", type);
    sessionStorage.setItem("fullname", fullname);
    setUser({ email, token, type, fullname });
  };

  const LogoutContext = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("fullname");
    setUser(null);
  };
  const contextValue = {
    LoginContext,
    LogoutContext,
    user,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserContextProvider;
