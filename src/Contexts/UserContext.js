import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (token !== null && email !== null) {
      setUser({ token, email });
    }
  }, []);
  const LoginContext = (email, token, type) => {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", type);
    setUser({ email, token, type });
  };

  const LogoutContext = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("type");
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
