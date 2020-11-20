import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

interface initialAuthStateType {
  name: string;
  token: string;
  expiredAt?: string;
}

const initialAuthState: initialAuthStateType = {
  name: "",
  token: "",
  expiredAt: "",
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => initialAuthState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initialMode = localStorage.getItem("mode") || "webchat";
  const [mode, setMode] = useState(() => initialMode);

  useEffect(() => {
    const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
    if (authFromLocalStorage) setAuth(authFromLocalStorage);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!auth.token);
  }, [auth]);

  const login = (newAuth: initialAuthStateType) => {
    setAuth(newAuth);
    console.log("logging in");
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(initialAuthState);
  };

  const storeMode = (mode) => {
    setMode(mode);
    localStorage.setItem("mode", mode);
  };

  return (
    <Provider value={{ auth, login, isLoggedIn, logout, mode, storeMode }}>{children}</Provider>
  );
};

export { AuthContext, AuthProvider };
