import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <FetchProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </FetchProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
