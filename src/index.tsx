import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/css/uikit.min.css";

import App from "./pages/App/index";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/index";
import {
  UserContext,
  UserContextValue,
  UserCredentials,
} from "./context/user-context";
import axios from "axios";
import CompaniesPage from "./pages/Companies";
import CompanyPage from "./pages/Company";
import "bootstrap/dist/css/bootstrap.min.css";

function Global() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
  }
  const [userCredentials, setUserCredentials] = useState<UserCredentials>(
    access_token ? { access_token } : null
  );
  const [userContext, setUserContext] = useState<UserContextValue>({
    loggedIn: !!access_token,
    login: async (username, password) => {
      const { data } = await axiosInstance.post("auth/login", {
        username,
        password,
      });
      axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      setUserCredentials(data);
    },
    logout: () => {
      delete axiosInstance.defaults.headers["Authorization"];
      setUserCredentials(null);
    },
  });

  useEffect(() => {
    if (!userCredentials) {
      localStorage.removeItem("access_token");
    } else {
      localStorage.setItem("access_token", userCredentials.access_token);
    }
    setUserContext((state) => ({
      ...state,
      loggedIn: userCredentials !== null,
    }));
  }, [userCredentials]);

  return (
    <UserContext.Provider value={userContext}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {userContext.loggedIn ? <Redirect to="/app" /> : <Login />}
          </Route>
          <ProtectedRoute path="/app" component={App} />
          <ProtectedRoute path="/companies/:id" component={CompanyPage} />
          <ProtectedRoute exact path="/companies" component={CompaniesPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Global />
  </React.StrictMode>,
  document.getElementById("root")
);
