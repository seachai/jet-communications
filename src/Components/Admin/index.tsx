import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@chakra-ui/react";

const Admin = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Component</h1>
      <Button onClick={logout} colorScheme='blue'>
        Logout
      </Button>
    </div>
  );
};

export default Admin;
