import React, { useEffect } from "react";
import UIkit from "uikit";
import { useForm } from "../../hooks/useForm";
import { usePost } from "../../hooks/usePost";
import { IFestival } from "../../utils/types";
import { required } from "../../validators";

export default function FestivalForm(props: {
  onSuccess?: (festival: IFestival) => void;
}) {
  const [form, formErrors] = useForm({
    name: { default: "", validators: [required()] },
    date: { default: "", validators: [required()] },
  });

  const [data, createFestival, loading, errored] = usePost<
    { name: string; date: string; isActive: boolean },
    IFestival
  >("/api/festival");

  useEffect(() => {
    if (errored) {
      UIkit.notification({
        message: "Impossible de créer le festival.",
        pos: "top-center",
        status: "danger",
      });
    }
  }, [errored]);

  useEffect(() => {
    if (props.onSuccess && data) {
      props.onSuccess(data);
    }
  }, [data]);

  return (
    <form
      className="uk-form-stacked"
      onSubmit={(e) => {
        e.preventDefault();
        createFestival({
          name: form.name.get(),
          date: form.date.get(),
          isActive: false,
        });
      }}
    >
      <div className="uk-margin">
        <label htmlFor="festivalName" className="uk-form-label">
          Nom
        </label>
        <div className="uk-form-controls">
          <input
            className="uk-input"
            id="festivalName"
            value={form.name.get()}
            onChange={(e) => form.name.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="festivalDate" className="uk-form-label">
          Date
        </label>
        <div className="uk-form-controls">
          <input
            type="date"
            className="uk-input"
            id="festivalDate"
            value={form.date.get()}
            onChange={(e) => form.date.set(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="uk-button uk-button-primary uk-align-center"
        disabled={!formErrors.$form.valid || loading}
      >
        Créer le festival
      </button>
    </form>
  );
}
