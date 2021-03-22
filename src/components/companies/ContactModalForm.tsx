import { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IContact } from "../../utils/types";
import * as EmailValidator from "email-validator";
import { useAxios } from "../../hooks/useAxios";
import UIkit from "uikit";

const ContactModalForm: FC<{
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  onSuccess: (contact: IContact) => void;
  companyId: string;
}> = ({ showModal, setShowModal, onSuccess, companyId }) => {
  const instance = useAxios();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isPrimary, setIsPrimary] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      validInput(firstName) &&
      validInput(lastName) &&
      validPhone(phone) &&
      validMail(email)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName, phone, email]);

  const validInput = (name: string): boolean => {
    if (name.length > 2 && name.length < 40) {
      return true;
    } else {
      return false;
    }
  };

  const validPhone = (input: string): boolean => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(input);
  };

  const validMail = (input: string): boolean => {
    return EmailValidator.validate(input);
  };

  const addContact = () => {
    const newContact: IContact = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      isPrimary: isPrimary,
      companyId: companyId,
    };
    instance
      .post("/api/contact", newContact)
      .then((res) => onSuccess(res.data))
      .catch((err) => {
        UIkit.notification({
          message: `Impossible d'ajouter ce contact : ${err}`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <div>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>
          Ajouter un contact
        </ModalHeader>
        <ModalBody>
          <form>
            <fieldset className="uk-fieldset">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Prénom du contact
                </label>
                <input
                  className={`uk-input ${
                    validInput(firstName) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer le prénom..."
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                />
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Nom du contact
                </label>
                <input
                  className={`uk-input ${
                    validInput(lastName) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer le nom..."
                  onChange={(e) => setLastName(e.currentTarget.value)}
                />
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Mail du contact
                </label>
                <input
                  className={`uk-input ${
                    validMail(email) ? "" : "uk-form-danger"
                  }`}
                  type="mail"
                  placeholder="entrer le mail..."
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Numéro de téléphone du contact
                </label>
                <input
                  className={`uk-input ${
                    validPhone(phone) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer le numéro..."
                  onChange={(e) => setPhone(e.currentTarget.value)}
                />
              </div>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={() => setIsPrimary(!isPrimary)}
                  />
                  Contact Principal?
                </label>
              </div>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="uk-button uk-button-primary"
            onClick={addContact}
            disabled={disabled}
          >
            {" "}
            Créer
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactModalForm;
