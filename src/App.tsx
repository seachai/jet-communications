import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./App.css";

import { AuthContext } from "./AuthProvider";

function App() {
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = () => {
    login("new auth");
    history.push("/admin");
  };

  return (
    <div className='App'>
      <h1>App Component</h1>
      <Button onClick={handleLogin} colorScheme='blue'>
        Login
      </Button>
    </div>
  );
}

export default App;
