import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import "./index.css";
import AuthProvider from "./AuthProvider";
import WithAuth from "./WithAuth";
import Navigation from "./Navigation";
import App from "./App";
import Admin from "./Components/Admin/";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path='/' component={App} />
            <WithAuth path='/admin'>
              <Admin />
            </WithAuth>
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
