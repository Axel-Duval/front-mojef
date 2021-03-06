import axios, { AxiosInstance } from "axios";
import React from "react";

interface UserCredentialsData {
  access_token: string;
  refresh_token: string;
}

export type UserCredentials = UserCredentialsData | null;

export interface UserContextValue {
  _credentials: UserCredentials;
  axios: AxiosInstance;
  login: (username: string, password: string) => Promise<void>;
  setCredentials: (credentials: UserCredentials) => void;
  logout: () => void;
  loggedIn: boolean;
  jwtPayload: { sub: string; username: string; isAdmin: boolean } | null;
}

export const UserContext = React.createContext<UserContextValue>({
  _credentials: null,
  axios: axios.create(),
  loggedIn: false,
  login: () => Promise.reject(),
  logout: () => {},
  setCredentials: () => {},
  jwtPayload: null,
});
