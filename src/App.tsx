import React, { useContext } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./App.css";

import { AuthContext } from "./AuthProvider";

function App() {
  const { auth, login } = useContext(AuthContext);

  console.log("auth", auth);

  return (
    <div className='App'>
      <button onClick={() => login("new auth")}>Login</button>
      <h1>Hello!!!fdafdfdafdafaf</h1>
      <Button colorScheme='blue'>Button</Button>
    </div>
  );
}

export default App;
