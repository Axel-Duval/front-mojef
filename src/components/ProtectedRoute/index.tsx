import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IUser } from "../../interfaces";

interface ProtectedRouteProperties extends RouteProps<any, any> {
  component: React.FC;
  user: IUser;
}

export const ProtectedRoute = ({
  component: Component,
  user,
  ...rest
}: ProtectedRouteProperties) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.username) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
