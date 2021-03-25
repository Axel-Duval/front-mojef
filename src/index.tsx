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
import Loading from "./components/Loading";

function credentialsFromLocalStorage(): UserCredentials {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  return access_token && refresh_token ? { access_token, refresh_token } : null;
}

function prepareAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    timeout: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      crossorigin: true,
    },
  });
}

async function refresh(
  refresh_token: string,
  axios: AxiosInstance
): Promise<UserCredentials> {
  try {
    const res = await axios.post("/auth/refresh", {
      refresh_token,
    });
    if (((res.status / 1000) | 0) !== 2) {
      return null;
    }
    return res.data;
  } catch {
    return null;
  }
}

function getPayloadOf(jwt: string) {
  return JSON.parse(atob(jwt.split(".")[1]));
}

function isExpired(payload: any) {
  return payload.exp * 1000 <= new Date().getTime();
}

function Global() {
  const [loaded, setLoaded] = useState(false);
  const [userContext, setUserContext] = useState<UserContextValue>({
    loggedIn: false,
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
            jwtPayload: getPayloadOf(credentials.access_token),
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
    _credentials: null,
    axios: prepareAxiosInstance(),
    jwtPayload: null,
  });

  // On app load
  useEffect(() => {
    if (!loaded) {
      const credentials = credentialsFromLocalStorage();
      if (!credentials) {
        setLoaded(true);
        return;
      }
      const accessTokenPayload = getPayloadOf(credentials.access_token);
      const refreshTokenPayload = getPayloadOf(credentials.refresh_token);
      if (isExpired(refreshTokenPayload)) {
        setLoaded(true);
        return;
      }

      if (isExpired(accessTokenPayload)) {
        refresh(credentials.refresh_token, userContext.axios).then(
          (credentials) => {
            if (credentials) {
              userContext.setCredentials(credentials);
            }
            setLoaded(true);
          }
        );
      } else {
        userContext.setCredentials(credentials);
        setLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (userContext._credentials) {
      const accessTokenPayload = getPayloadOf(
        userContext._credentials.access_token
      );
      const refreshTokenPayload = getPayloadOf(
        userContext._credentials.refresh_token
      );

      // Refresh token expired, we logout
      if (isExpired(refreshTokenPayload)) {
        userContext.logout();
        return;
      }

      const expTime = accessTokenPayload.exp;
      const time = expTime * 1000 - new Date().getTime() - 5000;

      // Planifying access_token refresh
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
      {!loaded ? (
        <Loading />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact>
              {userContext.loggedIn ? <Redirect to="/app" /> : <Login />}
            </Route>
            {userContext.loggedIn ? (
              <Route path="/app" component={App} />
            ) : null}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      )}
    </UserContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Global />
  </React.StrictMode>,
  document.getElementById("root")
);
