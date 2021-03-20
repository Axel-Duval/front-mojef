import React, { useState } from "react";
import svg from "../assets/images/collaboration.svg";
import UIkit from "uikit";
import { UserContext } from "../contexts/user";
import { useForm } from "../hooks/useForm";
import { required } from "../validators";

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
  const [form, formErrors] = useForm({
    username: {
      default: "",
      validators: [required()],
    },
    password: {
      default: "",
      validators: [required()],
    },
  });

  const [loggingIn, setLoggingIn] = useState(false);

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
            setLoggingIn(true);
            ctx
              .login(form.username.get(), form.password.get())
              .catch(showBadCredentialsNotification)
              .finally(() => setLoggingIn(false));
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
                value={form.username.get()}
                onChange={(e) => {
                  form.username.set(e.target.value);
                }}
              />
            </FormControl>
            <FormControl label="Mot de passe" icon="lock">
              <input
                className="uk-input"
                id="input-password"
                type="password"
                value={form.password.get()}
                onChange={(e) => {
                  form.password.set(e.target.value);
                }}
              />
            </FormControl>
            <button
              type="submit"
              className="uk-button uk-button-primary uk-align-center"
              disabled={!formErrors.$form.valid || loggingIn}
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
