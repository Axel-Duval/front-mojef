import { useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { IContact } from "../../utils/types";
import { minLength, validMail, validPhone } from "../../validators";

interface IContactForm {
  onSuccess: (contact: IContact, editMode: boolean) => void;
  companyId: string;
  contact: IContact | null;
}

const ContactForm = ({ onSuccess, contact, companyId }: IContactForm) => {
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = (c: IContact) => {
    setLoading(true);
    if (contact) {
      //Edit mode
      const { id, ...rest } = c;
      instance
        .patch(`/api/contact/${contact.id!}`, rest)
        .then((res) => {
          onSuccess(res.data, true);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible de modifier le contact`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    } else {
      //Add mode
      instance
        .post("/api/contact/", c)
        .then((res) => {
          onSuccess(res.data, false);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible de créer le contact`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const [form, formErrors] = useForm({
    firstname: {
      default: contact?.firstname || "",
      validators: [minLength(2)],
    },
    lastname: {
      default: contact?.lastname || "",
      validators: [minLength(2)],
    },
    isPrimary: {
      default: contact?.isPrimary || false,
      validators: [],
    },
    email: {
      default: contact?.email || "",
      validators: [validMail, minLength(2)],
    },
    phone: {
      default: contact?.phone || "",
      validators: [validPhone, minLength(2)],
    },
  });
  return (
    <form
      className="uk-form-stacked -noselect"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm({
          firstname: form.firstname.get(),
          lastname: form.lastname.get(),
          isPrimary: form.isPrimary.get(),
          email: form.email.get(),
          phone: form.phone.get(),
          companyId,
        });
      }}
    >
      <div className="uk-margin">
        <label htmlFor="contactFirstname" className="uk-form-label">
          Prénom
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="Aa"
            className="uk-input"
            id="contactFirstname"
            value={form.firstname.get()}
            onChange={(e) => form.firstname.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="contactLastname" className="uk-form-label">
          Nom
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="Aa"
            className="uk-input"
            id="contactLastname"
            value={form.lastname.get()}
            onChange={(e) => form.lastname.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="contactPhone" className="uk-form-label">
          Téléphone
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="06.60..."
            className="uk-input"
            id="contactPhone"
            type="phone"
            value={form.phone.get()}
            onChange={(e) => form.phone.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="contactEmail" className="uk-form-label">
          Email
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="name@provider.com"
            className="uk-input"
            id="contactEmail"
            type="email"
            value={form.email.get()}
            onChange={(e) => form.email.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={form.isPrimary.get()}
            onChange={(e) => form.isPrimary.set(!form.isPrimary.get())}
          />{" "}
          Contact principal
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
  );
};

export default ContactForm;
