import { FC, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IGame } from "../../utils/types";
import GameTypeInputForm from "./GameTypeInputForm";

const GameModalForm: FC<{
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  onSuccess: (game: IGame) => void;
  companyId: string;
}> = ({ showModal, setShowModal, onSuccess, companyId }) => {
  const instance = useAxios();
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [minPlayers, setMinPlayers] = useState<number>(-1);
  const [maxPlayers, setMaxPlayers] = useState<number>(-1);
  const [minAge, setMinAge] = useState<number>(-1);
  const [maxAge, setMaxAge] = useState<number>(-1);
  const [guideLink, setGuideLink] = useState<string | null>(null);
  const [guideField, setGuideField] = useState<boolean>(false);
  const [isPrototype, setIsPrototype] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      areValid(minAge, maxAge) &&
      areValid(minPlayers, maxPlayers) &&
      validInput(name) &&
      validInput(duration) &&
      validInput(type) &&
      ((guideField && guideLink) || (!guideField && !guideLink))
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    name,
    duration,
    minPlayers,
    maxPlayers,
    minAge,
    maxAge,
    guideField,
    guideLink,
    type,
  ]);

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

  const validUrl = (url: string): boolean => {
    return true;
  };

  const onGuideFieldChange = (): void => {
    if (guideField) {
      setGuideLink(null);
    }
    setGuideField(!guideField);
  };

  const addGame = (): void => {
    const newGame: IGame = {
      name,
      duration,
      minPlayers,
      maxPlayers,
      minAge,
      maxAge,
      isPrototype,
      guideLink,
      publisherId: companyId,
      type: type,
    };
    instance
      .post("/api/game", newGame)
      .then((res) => onSuccess(res.data))
      .catch(() => {
        UIkit.notification({
          message: `Impossible d'ajouter ce jeu`,
          status: "danger",
          pos: "top-center",
        });
      });
  };

  const areValid = (min: number, max: number): boolean => {
    return min > -1 && max > -1 && min <= max;
  };

  return (
    <div>
      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>
          Ajouter un jeu
        </ModalHeader>
        <ModalBody>
          <form className="uk-form uk-form-stacked">
            <fieldset className="uk-fieldset">
              <div className="uk-margin">
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
              <div className="uk-margin">
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
              <div className="uk-margin">
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
              <div className="uk-margin">
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
              <GameTypeInputForm setType={setType} />
              <div className="uk-margin">
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
              <div className="uk-margin">
                <label>
                  <input
                    className="uk-checkbox"
                    type="checkbox"
                    onChange={onGuideFieldChange}
                    checked={guideField}
                  />
                  A t-il un lien de manuel?
                </label>
              </div>
              <div className="uk-margin" hidden={!guideField}>
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Lien du manuel
                </label>
                <input
                  className={`uk-input ${
                    validUrl(name) ? "" : "uk-form-danger"
                  }`}
                  type="text"
                  placeholder="entrer le lien..."
                  onChange={(e) => setGuideLink(e.currentTarget.value)}
                />
              </div>
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="uk-button uk-button-primary"
            onClick={addGame}
            disabled={disabled}
          >
            Créer
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default GameModalForm;
