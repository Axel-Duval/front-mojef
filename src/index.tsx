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
import Publishers from "./pages/Publishers";

function Global() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  const [userCredentials, setUserCredentials] = useState<UserCredentials>(
    () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return { access_token };
      }
      return null;
    }
  );
  const [userContext, setUserContext] = useState<UserContextValue>({
    loggedIn: false,
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
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setUserCredentials({
        access_token,
      });
    }
  }, []);

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
          <ProtectedRoute path="/publishers" component={Publishers} />
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
