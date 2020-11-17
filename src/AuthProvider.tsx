import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

interface initialAuthStateType {
  token: string | null;
  expiredAt: string | null;
}

const initialAuthState: initialAuthStateType = {
  token: "",
  expiredAt: "",
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => initialAuthState);

  useEffect(() => {
    const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
    if (authFromLocalStorage) setAuth(authFromLocalStorage);
  }, []);

  const login = (newAuth: string) => {
    setAuth({ ...auth, token: newAuth });
    console.log("logging in");
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(initialAuthState);
  };

  const isLoggedIn = () => (auth.token ? true : false);

  return (
    <AuthContext.Provider value={{ auth, login, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
