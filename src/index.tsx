import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "uikit/dist/css/uikit-core.min.css";
import "uikit/dist/css/uikit.min.css";

/**
 * IMPORT ALL CSS FILES IN ASSETS
 */
import "../src/assets/styles/main.css";
import "../src/assets/styles/navbar.css";
import "../src/assets/styles/company.css";
import "../src/assets/styles/bookings.css";
import "../src/assets/styles/tables.css";
import "../src/assets/styles/modal.css";
import "../src/assets/styles/tile.css";
import "../src/assets/styles/prices.css";

import App from "./app";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  UserContext,
  UserContextValue,
  UserCredentials,
} from "./contexts/user";
import axios, { AxiosInstance } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function prepareLoginState(): UserCredentials {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return access_token && refresh_token ? { access_token, refresh_token } : null;
}

function prepareAxiosInstance(creds: UserCredentials): AxiosInstance {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
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
    let userCredentials = prepareLoginState();
    const axiosInstance = prepareAxiosInstance(userCredentials);
    if (userCredentials) {
      const expirationDateRefresh = JSON.parse(
        atob(userCredentials.refresh_token.split(".")[0])
      ).exp;
      const expRefresh = new Date(expirationDateRefresh);
      if (expRefresh > new Date()) {
        userCredentials = null;
      } else {
        axiosInstance
          .post("/auth/refresh", {
            refresh_token: userCredentials.refresh_token,
          })
          .then((res) => {
            if (res.status === 200) {
              userContext.setCredentials(res.data);
            }
          })
          .catch(() => {
            userContext.logout();
          });
      }
    }
    return {
      loggedIn: !!userCredentials,
      login: async (username, password) => {
        const { data } = await userContext.axios.post("auth/login", {
          username,
          password,
        });
        userContext.setCredentials(data);
      },
      logout: () => {
        userContext.setCredentials(null);
      },
      setCredentials: (credentials: UserCredentials) => {
        if (credentials) {
          localStorage.setItem("access_token", credentials.access_token);
          localStorage.setItem("refresh_token", credentials.refresh_token);
          setUserContext((ctx) => {
            ctx.axios.defaults.headers[
              "Authorization"
            ] = `Bearer ${credentials.access_token}`;
            return {
              ...ctx,
              _credentials: credentials,
              loggedIn: true,
              jwtPayload: JSON.parse(
                atob(credentials.access_token.split(".")[1])
              ),
            };
          });
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUserContext((ctx) => {
            delete ctx.axios.defaults.headers["Authorization"];
            return {
              ...ctx,
              _credentials: credentials,
              loggedIn: false,
              jwtPayload: null,
            };
          });
        }
      },
      _credentials: userCredentials,
      axios: axiosInstance,
      jwtPayload: userCredentials
        ? JSON.parse(atob(userCredentials.access_token.split(".")[1]))
        : null,
    };
  });

  useEffect(() => {
    if (userContext._credentials) {
      const accessTokenPayload = JSON.parse(
        atob(userContext._credentials.access_token.split(".")[1])
      );
      const expTime = accessTokenPayload.exp;
      const time = expTime * 1000 - new Date().getTime() - 5000;

      const id = setTimeout(() => {
        userContext.axios
          .post("/auth/refresh", {
            refresh_token: userContext._credentials?.refresh_token,
          })
          .then((res) => {
            if (res.status === 200) {
              userContext.setCredentials(res.data);
            }
          })
          .catch(() => {
            userContext.logout();
          });
      }, time);
      return () => {
        clearTimeout(id);
      };
    }
  }, [userContext]);

  return (
    <UserContext.Provider value={userContext}>
      <Router>
        <Switch>
          <Route path="/" exact>
            {userContext.loggedIn ? <Redirect to="/app" /> : <Login />}
          </Route>
          {userContext.loggedIn ? <Route path="/app" component={App} /> : null}
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
