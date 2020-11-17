import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

const WithAuth = ({ children, ...props }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={() => isLoggedIn ? children : <Redirect to='/' />}
    />
  );
};

export default WithAuth;
