import { useContext, useEffect } from "react";
import UIkit from "uikit";
import { UserContext } from "../contexts/user";
import { useForm } from "../hooks/useForm";
import { usePatch } from "../hooks/usePatch";
import { minLength, required } from "../validators";

const Account = () => {
  const ctx = useContext(UserContext);

  const [data, changePassword, loading, errored] = usePatch(
    `/api/user/${ctx.jwtPayload?.sub}`
  );

  const [formData, formErrors] = useForm(
    {
      password: { default: "", validators: [minLength(8)] },
      passwordValid: { default: "", validators: [required()] },
    },
    [
      (formData) => {
        if (formData.password !== formData.passwordValid) {
          return {
            passwordMatches: true,
          };
        }
        return null;
      },
    ]
  );

  useEffect(() => {
    if (data) {
      formData.password.set("");
      formData.passwordValid.set("");

      UIkit.notification({
        message: "Votre mot de passe a été changé",
        pos: "top-center",
        status: "success",
      });
    }
  }, [data]);

  useEffect(() => {
    if (errored) {
      UIkit.notification({
        message: "Impossible de mettre à jour le mot de passe",
        pos: "top-center",
        status: "danger",
      });
    }
  }, [errored]);

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Mon compte</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changePassword({
            password: formData.password.get(),
          });
        }}
      >
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="username">
            Nom d'utilisateur
          </label>
          <div className="uk-form-controls">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input
                className="uk-input"
                type="text"
                value={ctx.jwtPayload?.username}
                disabled={true}
                id="username"
              />
            </div>
          </div>
        </div>

        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="password">
            Nouveau mot de passe
          </label>
          <div className="uk-form-controls">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input
                className="uk-input"
                type="password"
                value={formData.password.get()}
                onChange={(e) => formData.password.set(e.target.value)}
                disabled={loading}
                id="password"
              />
            </div>
          </div>
          {formErrors.password && formData.password.get() ? (
            <div className="uk-text-danger uk-text-small">
              Le mot de passe doit faire 8 caractères minimum
            </div>
          ) : null}
        </div>

        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="passwordConfirm">
            Confirmaton du nouveau de passe
          </label>
          <div className="uk-form-controls">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input
                className="uk-input"
                type="password"
                value={formData.passwordValid.get()}
                onChange={(e) => formData.passwordValid.set(e.target.value)}
                disabled={loading}
                id="passwordConfirm"
              />
            </div>
          </div>
          {formData.passwordValid.get() &&
          formErrors.$form.errors &&
          formErrors.$form.errors.passwordMatches ? (
            <div className="uk-text-danger uk-text-small">
              Les mots de passe doivent correspondre
            </div>
          ) : null}
        </div>

        <div className="uk-margin">
          <div className="uk-form-controls">
            <label>
              <input
                className="uk-checkbox"
                type="checkbox"
                disabled={true}
                checked={ctx.jwtPayload ? ctx.jwtPayload.isAdmin : false}
              />{" "}
              Administrateur
            </label>
          </div>
        </div>

        <div>
          <button
            className="uk-button uk-button-primary"
            disabled={!formErrors.$form.valid || loading}
            type="submit"
          >
            Changer de mot de passe
            {loading ? <div uk-spinner={true}></div> : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
