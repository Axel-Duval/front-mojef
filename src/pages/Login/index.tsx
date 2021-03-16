import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { IUser } from "../../interfaces";
import "./style.css";
import svg from "../../assets/pictures/collaboration.svg";
import UIkit from "uikit";

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

  const validate = () => {
    return username.length > 2 && password.length > 2;
  };

  const login = () => {
    if (validate()) {
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
          UIkit.notification({
            message:
              "<div class='uk-text-center'><span uk-icon='icon: ban' class='uk-margin-small-right'></span><span class='uk-text-middle'> Authentification invalide </span> </div>",
            status: "danger",
            pos: "top-center",
          });
          setPassword("");
        });
    } else {
      UIkit.notification({
        message:
          "<div class='uk-text-center'><span uk-icon='icon: warning' class='uk-margin-small-right'></span><span class='uk-text-middle'> Champs invalides </span> </div>",
        status: "warning",
        pos: "top-center",
      });
    }
  };
  if (user.username) {
    return <Redirect to="/app" />;
  } else {
    return (
      <div id="login-layout">
        <div className="uk-width-5-6 uk-width-2-3@s uk-width-1-3@m uk-width-1-4@l uk-padding">
          <h1 className="uk-text-center uk-text-bold uk-padding-small@m">
            Connexion
          </h1>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="input-username">
              Identifiant
            </label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-expand">
                <span className="uk-form-icon" uk-icon="icon: user" />
                <input
                  className="uk-input"
                  id="input-username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="input-password">
              Mot de passe
            </label>
            <div className="uk-form-controls">
              <div className="uk-inline uk-width-expand">
                <span className="uk-form-icon" uk-icon="icon: lock" />
                <input
                  className="uk-input"
                  id="input-password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={login}
            className="uk-button uk-button-primary uk-align-center"
          >
            Valider
          </button>
        </div>
        <div className="uk-width-1-3@l uk-visible@l">
          <img
            src={svg}
            alt="Collaboration Illustration"
            className="uk-padding-large"
          />
        </div>
      </div>
    );
  }
}

export default Login;
