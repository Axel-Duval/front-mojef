import React, { useState } from "react";
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
import { IUser } from "./interfaces";

function Global() {
  const [user, setUser] = useState<IUser>({});

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login
              loginUser={(user: IUser) => {
                setUser(user);
              }}
              user={user}
            />
          </Route>
          <ProtectedRoute path="/app" user={user} component={App} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Global />
  </React.StrictMode>,
  document.getElementById("root")
);
