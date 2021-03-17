import React, { useEffect, useState } from "react";
import "./style.css";
import svg from "../../assets/pictures/collaboration.svg";
import UIkit from "uikit";
import { UserContext } from "../../context/user-context";

/*
 * Here just to make html in Login component a bit shorter
 */
function FormControl(props: { label: string; icon: string; children: any }) {
  return (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="input-username">
        {props.label}
      </label>
      <div className="uk-form-controls">
        <div className="uk-inline uk-width-expand">
          <span className="uk-form-icon" uk-icon={`icon: ${props.icon}`} />
          {props.children}
        </div>
      </div>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(username.length > 2 && password.length > 0);
  }, [username, password]);

  const showBadCredentialsNotification = () => {
    UIkit.notification({
      message:
        "<div class='uk-text-center'><span uk-icon='icon: ban' class='uk-margin-small-right'></span><span class='uk-text-middle'> Authentification invalide </span> </div>",
      status: "danger",
      pos: "top-center",
    });
  };
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <form
          id="login-layout"
          onSubmit={(e) => {
            e.preventDefault();
            setFormValid(false); // Disable button
            ctx.login(username, password).catch(showBadCredentialsNotification);
          }}
        >
          <div className="uk-width-5-6 uk-width-2-3@s uk-width-1-3@m uk-width-1-4@l uk-padding">
            <h1 className="uk-text-center uk-text-bold uk-padding-small@m">
              Connexion
            </h1>
            <FormControl label="Identifiant" icon="user">
              <input
                className="uk-input"
                id="input-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </FormControl>
            <FormControl label="Mot de passe" icon="lock">
              <input
                className="uk-input"
                id="input-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <button
              type="submit"
              className="uk-button uk-button-primary uk-align-center"
              disabled={!formValid}
            >
              Se connecter
            </button>
          </div>
          <div className="uk-width-1-3@l uk-visible@l">
            <img
              src={svg}
              alt="Collaboration Illustration"
              className="uk-padding-large"
            />
          </div>
        </form>
      )}
    </UserContext.Consumer>
  );
}

export default Login;
