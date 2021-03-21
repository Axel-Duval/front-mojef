import { useEffect, useState } from "react";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IPartialCompany } from "../../utils/types";

const CompanyModalForm = (props: {
  showModal: boolean;
  setShowModal: () => void;
  addCompany: (company: IPartialCompany) => void;
  companies: IPartialCompany[];
}) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [publisher, setPublisher] = useState<boolean>(false);
  const [exhibitor, setExhibitor] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (validInput(name) && validInput(address) && !nameAlreadyExists(name)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, address]);

  const validInput = (name: string): boolean => {
    if (name.length > 2 && name.length < 40) {
      return true;
    } else {
      return false;
    }
  };

  const submitForm = () => {
    props.addCompany({
      name,
      address,
      isPublisher: publisher,
      isExhibitor: exhibitor,
      isActive: true,
    });
    props.setShowModal();
  };

  const nameAlreadyExists = (name: string): boolean => {
    for (let i = 0; i < props.companies.length; i++) {
      if (props.companies[i].name === name) {
        return true;
      }
    }
    return false;
  };

  return (
    <Modal isOpen={props.showModal} toggle={props.setShowModal}>
      <ModalHeader toggle={props.setShowModal}>Ajouter une société</ModalHeader>
      <ModalBody>
        {nameAlreadyExists(name) ? (
          <>
            <Alert color="danger">{name} est déjà utilisée.</Alert>
          </>
        ) : (
          ""
        )}
        <form className="uk-form uk-form-stacked">
          <fieldset className="uk-fieldset">
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Nom de la société
              </label>
              <input
                className={`uk-input ${
                  validInput(name) && !nameAlreadyExists(name)
                    ? ""
                    : "uk-form-danger"
                }`}
                type="text"
                placeholder="entrer le nom..."
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Adresse
              </label>
              <textarea
                rows={5}
                className={`uk-text-area ${
                  validInput(address) ? "" : "uk-form-danger"
                }`}
                onChange={(e) => setAddress(e.currentTarget.value)}
              ></textarea>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Est-ce un exposant?
              </label>
              <input
                className="uk-checkbox"
                type="checkbox"
                onChange={() => setExhibitor(!exhibitor)}
              />
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Est-ce un éditeur?
              </label>
              <input
                className="uk-checkbox"
                type="checkbox"
                onChange={() => setPublisher(!publisher)}
              />
            </div>
          </fieldset>
        </form>
      </ModalBody>
      <ModalFooter>
        <button
          className="uk-button uk-button-primary"
          onClick={submitForm}
          disabled={disabled}
        >
          Créer
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default CompanyModalForm;
