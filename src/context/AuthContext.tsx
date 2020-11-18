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

  return <Provider value={{ login, isLoggedIn, logout }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
