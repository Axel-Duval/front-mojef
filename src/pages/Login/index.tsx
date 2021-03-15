import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { IUser } from "../../interfaces";

interface LoginPropertiesTypes {
  loginUser: Function;
  user: IUser;
}

function Login({ loginUser, user }: LoginPropertiesTypes) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const instance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
  });

  //id: ecc61cc7-27ae-4a35-b752-11608b8065ac

  const login = () => {
    instance
      .post("/auth/login", {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.access_token;
        loginUser({
          username,
          password,
          token,
        });
      })
      .catch((err) => {
        console.log("unauthenticated");
      });
  };
  if (user.username) {
    return <Redirect to="/app" />;
  } else {
    return (
      <>
        <h1>Login page</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </>
    );
  }
}

export default Login;
