import React, { useState } from "react";
import ReactDOM from "react-dom";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/css/uikit.min.css";

/**
 * IMPORT ALL CSS FILES IN ASSETS
 */
import "../src/assets/styles/main.css";
import "../src/assets/styles/navbar.css";
import "../src/assets/styles/bookings.css";
import "../src/assets/styles/tables.css";

import App from "./app";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  UserContext,
  UserContextValue,
  UserCredentials,
} from "./utils/user-context";
import axios, { AxiosInstance } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function prepareLoginState(): UserCredentials {
  const access_token = localStorage.getItem("access_token");
  return access_token ? { access_token } : null;
}

function prepareAxiosInstance(creds: UserCredentials): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      crossorigin: true,
      Authorization: creds ? `Bearer ${creds.access_token}` : undefined,
    },
  });
}

function Global() {
  const [userContext, setUserContext] = useState<UserContextValue>(() => {
    const userCredentials = prepareLoginState();
    const axiosInstance = prepareAxiosInstance(userCredentials);
    return {
      loggedIn: !!userCredentials,
      login: async (username, password) => {
        const { data } = await userContext.axios.post("auth/login", {
          username,
          password,
        });
        localStorage.setItem("access_token", data.access_token);
        setUserContext((currentState) => {
          currentState.axios.defaults.headers["Authorization"] =
            data.access_token;
          return { ...currentState, _credentials: data, loggedIn: true };
        });
      },
      logout: () => {
        localStorage.removeItem("access_token");
        setUserContext((currentState) => {
          delete currentState.axios.defaults.headers["Authorization"];
          return {
            ...currentState,
            _credentials: null,
            loggedIn: false,
          };
        });
      },
      _credentials: userCredentials,
      axios: axiosInstance,
    };
  });

  return (
    <UserContext.Provider value={userContext}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {userContext.loggedIn ? <Redirect to="/app" /> : <Login />}
          </Route>
          <ProtectedRoute path="/app" component={App} />
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
