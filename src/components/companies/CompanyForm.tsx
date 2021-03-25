import { FC, useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { IPartialCompany } from "../../utils/types";
import { minLength } from "../../validators";

const CompanyForm: FC<{
  onSuccess: (company: IPartialCompany) => void;
  companies: IPartialCompany[];
}> = ({ onSuccess, companies }) => {
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [uniqueNameAlert, setUniqueNameAlert] = useState<boolean>(false);

  const uniqueNameConstraint = (v: string): any | null => {
    if (companies.map((c) => c.name).includes(v)) {
      return {
        notUnique: true,
      };
    } else {
      return null;
    }
  };

  const [form, formErrors] = useForm({
    name: { default: "", validators: [minLength(2), uniqueNameConstraint] },
    address: { default: "", validators: [minLength(2)] },
    isPublisher: { default: false, validators: [] },
    isExhibitor: { default: false, validators: [] },
  });

  const addCompany = () => {
    const newCompany: IPartialCompany = {
      name: form.name.get(),
      address: form.address.get(),
      isPublisher: form.isPublisher.get(),
      isExhibitor: form.isExhibitor.get(),
      isActive: true,
    };
    setLoading(true);
    instance
      .post("/api/company", newCompany)
      .then((res) => {
        onSuccess(res.data);
      })
      .catch(() =>
        UIkit.notification({
          message: `Impossible d'ajouter cette société`,
          status: "danger",
          pos: "top-center",
        })
      );
    setLoading(false);
  };

  useEffect(() => {
    if (formErrors.name && formErrors.name.notUnique) {
      setUniqueNameAlert(true);
    } else {
      setUniqueNameAlert(false);
    }
  }, [formErrors]);

  return (
    <form
      className="uk-form uk-form-stacked"
      onSubmit={(e) => {
        e.preventDefault();
        addCompany();
      }}
    >
      {uniqueNameAlert && (
        <div className="uk-alert-danger">
          <p>{`Le nom de société ${form.name.get()} existe déjà !`}</p>
        </div>
      )}
      <fieldset className="uk-fieldset">
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Nom société
          </label>
          <input
            className="uk-input"
            type="text"
            placeholder="Aa"
            onChange={(e) => form.name.set(e.currentTarget.value)}
          />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Adresse
          </label>
          <input
            className="uk-input"
            type="text"
            placeholder="Aa"
            onChange={(e) => form.address.set(e.currentTarget.value)}
          />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Est-ce un exposant?
          </label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={() => form.isExhibitor.set(!form.isExhibitor.get())}
          />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Est-ce un éditeur?
          </label>
          <input
            className="uk-checkbox"
            type="checkbox"
            onChange={() => form.isPublisher.set(!form.isPublisher.get())}
          />
        </div>
      </fieldset>
      <button
        className="uk-button uk-button-primary"
        type="submit"
        disabled={loading || !formErrors.$form.valid}
      >
        Créer
      </button>
    </form>
  );
};
export default CompanyForm;
