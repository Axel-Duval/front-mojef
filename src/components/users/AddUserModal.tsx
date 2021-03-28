import React, { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { IUser, IUserCreate } from "../../utils/types";
import { minLength } from "../../validators";
import Modal from "../Modal";

interface IAddUserModal {
  onClose: Function;
  onSuccess: Function;
  user?: IUser | null;
}

const AddUserModal = ({ onClose, onSuccess, user }: IAddUserModal) => {
  const instance = useAxios();
  const [loading, setLoading] = useState(false);
  const [form, formErrors] = useForm({
    username: {
      default: user ? user.username : "",
      validators: [minLength(2)],
    },
    password: {
      default: "",
      validators: [minLength(2)],
    },
    isAdmin: {
      default: user ? user.isAdmin : false,
      validators: [],
    },
  });

  const submitForm = (u: IUserCreate) => {
    setLoading(true);
    if (user) {
      //Edit mode
      instance
        .patch(`/api/user/${user.id}`, u)
        .then((res) => {
          onSuccess(res.data, true);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible de modifier l'utilisateur`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    } else {
      //Add mode
      instance
        .post("/api/user", u)
        .then((res) => {
          onSuccess(res.data, false);
        })
        .catch((err) => {
          console.log(err);
          UIkit.notification({
            message: `Impossible de créer l'utilisateur`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Modal
      title={user ? "Modifier utilisateur" : "Créer utilisateur"}
      onClose={onClose}
    >
      <form
        className="uk-form-stacked -noselect"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm({
            username: form.username.get(),
            password: form.password.get(),
            isAdmin: form.isAdmin.get(),
          });
        }}
      >
        <div className="uk-margin">
          <label htmlFor="usernameLabel" className="uk-form-label">
            Nom utilisateur
          </label>
          <div className="uk-form-controls">
            <input
              placeholder="Aa"
              type="text"
              className="uk-input"
              id="usernameLabel"
              value={form.username.get()}
              onChange={(e) => form.username.set(e.target.value)}
            />
          </div>
        </div>
        <div className="uk-margin">
          <label htmlFor="passwordLabel" className="uk-form-label">
            Mot de passe provisoire
          </label>
          <div className="uk-form-controls">
            <input
              placeholder="Aa"
              type="password"
              className="uk-input"
              id="passwordLabel"
              value={form.password.get()}
              onChange={(e) => form.password.set(e.target.value)}
            />
          </div>
        </div>
        <div className="uk-margin">
          <label>
            <input
              className="uk-checkbox"
              type="checkbox"
              onChange={() => form.isAdmin.set(!form.isAdmin.get())}
              checked={form.isAdmin.get()}
            />{" "}
            Admin
          </label>
        </div>

        <button
          type="submit"
          className="uk-button uk-button-primary uk-align-center"
          disabled={loading || !formErrors.$form.valid}
        >
          Enregistrer
        </button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
