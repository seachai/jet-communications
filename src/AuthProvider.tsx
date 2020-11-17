import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const initialAuthState = {
  token: null,
  expiredAt: null,
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => initialAuthState);

  useEffect(() => {
    const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
    if (authFromLocalStorage) setAuth(authFromLocalStorage);
  }, []);

  const login = (newAuth) => {
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(initialAuthState);
  };

  const isLoggedIn = () => !!auth.token;

  return (
    <AuthContext.Provider value={{ auth, login, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
