import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { IContact, IGame } from "../utils/types";
import * as EmailValidator from "email-validator";
import { isNumericLiteral } from "typescript";

const GameModalForm = (props: {
  showModal: boolean;
  setShowModal: () => void;
  addGame: (game: IGame) => void;
  companyId: string;
}) => {
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [minPlayers, setMinPlayers] = useState<number>(-1);
  const [maxPlayers, setMaxPlayers] = useState<number>(-1);
  const [minAge, setMinAge] = useState<number>(-1);
  const [maxAge, setMaxAge] = useState<number>(-1);
  const [isPrototype, setIsPrototype] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      areValid(minAge, maxAge) &&
      areValid(minPlayers, maxPlayers) &&
      validInput(name) &&
      validInput(duration)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, duration, minPlayers, maxPlayers, minAge, maxAge]);

  const validInput = (name: string): boolean => {
    if (name.length > 2 && name.length < 40) {
      return true;
    } else {
      return false;
    }
  };

  const handleNumberChange = (
    i: string,
    setNumber: (input: number) => void
  ) => {
    if (isNaN(Number(i))) {
      setNumber(-1);
    } else {
      setNumber(parseInt(i, 10));
    }
  };

  const submitForm = (): void => {
    props.addGame({
      name,
      duration,
      minPlayers,
      maxPlayers,
      minAge,
      maxAge,
      isPrototype,
      publisherId: props.companyId,
    });
    props.setShowModal();
  };

  const areValid = (min: number, max: number): boolean => {
    return min > -1 && max > -1 && min <= max;
  };

  return (
    <div>
      <Modal isOpen={props.showModal} toggle={props.setShowModal}>
        <ModalHeader toggle={props.setShowModal}>Ajouter un jeu</ModalHeader>
        <ModalBody>
          <form className="uk-form uk-form-stacked">
            <fieldset className="uk-fieldset">
              <div className="uk-form-row">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Nom du jeu
                </label>
                <input
                  className={`uk-input ${
                    validInput(name) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer le nom..."
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <div className="uk-form-row">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Durée du jeu
                </label>
                <input
                  className={`uk-input ${
                    validInput(duration) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer la durée..."
                  onChange={(e) => setDuration(e.currentTarget.value)}
                />
              </div>
              <div className="uk-form-row">
                <div className="uk-grid">
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label"
                      htmlFor="form-stacked-text"
                    >
                      Age minimum
                    </label>
                    <input
                      className={`uk-input ${
                        areValid(minAge, maxAge) ? "" : "uk-form-danger"
                      }`}
                      type="number"
                      onChange={(e) => {
                        handleNumberChange(e.currentTarget.value, setMinAge);
                      }}
                    />
                  </div>
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label"
                      htmlFor="form-stacked-text"
                    >
                      Age maximum
                    </label>
                    <input
                      className={`uk-input ${
                        areValid(minAge, maxAge) ? "" : "uk-form-danger"
                      }`}
                      type="number"
                      onChange={(e) =>
                        handleNumberChange(e.currentTarget.value, setMaxAge)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="uk-form-row">
                <div className="uk-grid">
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label"
                      htmlFor="form-stacked-text"
                    >
                      Nombre de joueurs minimum
                    </label>
                    <input
                      className={`uk-input ${
                        areValid(minPlayers, maxPlayers) ? "" : "uk-form-danger"
                      }`}
                      type="number"
                      onChange={(e) =>
                        handleNumberChange(e.currentTarget.value, setMinPlayers)
                      }
                    />
                  </div>
                  <div className="uk-width-1-2">
                    <label
                      className="uk-form-label"
                      htmlFor="form-stacked-text"
                    >
                      Nombre de joueurs maximum
                    </label>
                    <input
                      className={`uk-input ${
                        areValid(minPlayers, maxPlayers) ? "" : "uk-form-danger"
                      }`}
                      type="number"
                      onChange={(e) =>
                        handleNumberChange(e.currentTarget.value, setMaxPlayers)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="uk-form-row">
                <label>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={() => setIsPrototype(!isPrototype)}
                    checked={isPrototype}
                  />
                  Est-ce un prototype?
                </label>
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
            {" "}
            Créer
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GameModalForm;
