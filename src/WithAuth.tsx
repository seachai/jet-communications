import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

const WithAuth = ({ children, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return <Route {...props} render={() => (isLoggedIn ? children : <Redirect to='/' />)} />;
};

export default WithAuth;
