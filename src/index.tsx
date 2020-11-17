import React, { useContext } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import "./index.css";
import AuthProvider, { AuthContext } from "./AuthProvider";
import App from "./App";
import Admin from "./Components/Admin/";

// import reportWebVitals from './reportWebVitals';

const WithAuth = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn() ? children : <Redirect to='/404' />)}
    />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Link to='/admin'>Admin</Link>
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
