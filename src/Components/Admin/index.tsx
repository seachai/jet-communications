import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";

const Admin = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Component</h1>
    </div>
  );
};

export default Admin;
