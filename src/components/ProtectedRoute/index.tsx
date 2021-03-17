import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { UserContext } from "../../context/user-context";

interface ProtectedRouteProperties extends RouteProps<any, any> {
  component: React.FC;
}

export const ProtectedRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProperties) => {
  return (
    <UserContext.Consumer>
      { ctx => (
          <Route
            {...rest}
            render={(props) => {
              if (ctx.loggedIn) {
                return <Component />;
              } else {
                return (
                  <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                );
              }
            }}
          />
      )}
    </UserContext.Consumer>
  );
};
