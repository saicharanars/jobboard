"use client";

import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
  role: "",
});

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const user = JSON.parse(atob(storedToken.split(".")[1]));
      const expirationTime = user.exp * 1000; // Convert to milliseconds
      if (Date.now() < expirationTime) {
        setToken(storedToken);
        setIsLoggedIn(true);
        setRole(user.role);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const loginHandler = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    role: role,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
