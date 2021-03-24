import { FC, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { IGame } from "../../utils/types";
import { minLength } from "../../validators";
import GameTypeInputForm from "./GameTypeInputForm";

const GameForm: FC<{
  onSubmit: (game: IGame, editMode: boolean) => void;
  game: IGame | null;
  companyId: string;
}> = ({ onSubmit, game, companyId }) => {
  const ageConstraint = (formData: any): null | any => {
    if (formData.minAge <= formData.maxAge) {
      return null;
    } else {
      return {
        minltmaxage: false,
      };
    }
  };

  const playersConstraint = (formData: any): null | any => {
    if (formData.minPlayers <= formData.maxPlayers) {
      return null;
    } else {
      return {
        minltmaxplayers: false,
      };
    }
  };

  const positiveNumber = (v: number): null | any => {
    let res = v > -1 ? null : { ltzero: true };
    return res;
  };

  const guideConstraint = (formData: any): null | any => {
    if (
      !formData.guideField ||
      (formData.guideField && formData.guideLink.length >= 2)
    ) {
      return null;
    } else {
      return {
        guideConstraint: "false",
      };
    }
  };

  const validUrl = (input: string | null): any | null => {
    if (input) {
    }
    return null;
  };

  const [form, formErrors] = useForm(
    {
      name: { default: game ? game.name : "", validators: [minLength(2)] },
      duration: {
        default: game ? game.duration : "",
        validators: [minLength(2)],
      },
      minPlayers: {
        default: game ? game.minPlayers : 0,
        validators: [positiveNumber],
      },
      maxPlayers: {
        default: game ? game.maxPlayers : 0,
        validators: [positiveNumber],
      },
      minAge: { default: game ? game.minAge : 0, validators: [positiveNumber] },
      maxAge: { default: game ? game.maxAge : 0, validators: [positiveNumber] },
      guideLink: {
        default: game && game.guideLink ? game.guideLink : "https://",
        validators: [],
      },
      guideField: {
        default: game && game.guideLink ? true : false,
        validators: [],
      },
      isPrototype: { default: game ? game.isPrototype : false, validators: [] },
      type: { default: game ? game.type : "", validators: [minLength(2)] },
    },
    [playersConstraint, ageConstraint, guideConstraint]
  );
  const editMode = game ? true : false;

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

  const onGuideFieldChange = (): void => {
    if (form.guideField.get()) {
      form.guideLink.get(null);
    }
    form.guideField.set(!form.guideField.get());
  };

  const submitForm = () => {
    const newGame: IGame = {
      name: form.name.get(),
      duration: form.duration.get(),
      minPlayers: form.minPlayers.get(),
      maxPlayers: form.maxPlayers.get(),
      minAge: form.minAge.get(),
      maxAge: form.maxAge.get(),
      isPrototype: form.isPrototype.get(),
      guideLink: form.guideField.get() ? form.guideLink.get() : null,
      publisherId: companyId,
      type: form.type.get(),
    };
    if (editMode) {
      onSubmit({ ...newGame, id: game!.id }, true);
    } else {
      onSubmit(newGame, false);
    }
  };

  return (
    <form className="uk-form-stacked -noselect" onSubmit={submitForm}>
      <fieldset className="uk-fieldset">
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Nom du jeu
          </label>
          <input
            className="uk-input"
            type="text"
            placeholder="entrer le nom..."
            defaultValue={form.name.get()}
            onChange={(e) => form.name.set(e.currentTarget.value)}
          />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Durée du jeu
          </label>
          <input
            className="uk-input"
            type="text"
            placeholder="entrer la durée..."
            defaultValue={form.duration.get()}
            onChange={(e) => form.duration.set(e.currentTarget.value)}
          />
        </div>
        <div className="uk-margin">
          <div className="uk-grid">
            <div className="uk-width-1-2">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Age minimum
              </label>
              <input
                className="uk-input"
                type="number"
                defaultValue={form.minAge.get()}
                onChange={(e) => {
                  handleNumberChange(e.currentTarget.value, form.minAge.set);
                }}
              />
            </div>
            <div className="uk-width-1-2">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Age maximum
              </label>
              <input
                className="uk-input"
                type="number"
                defaultValue={form.maxAge.get()}
                onChange={(e) =>
                  handleNumberChange(e.currentTarget.value, form.maxAge.set)
                }
              />
            </div>
          </div>
        </div>
        <div className="uk-margin">
          <div className="uk-grid">
            <div className="uk-width-1-2">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Nombre de joueurs minimum
              </label>
              <input
                className="uk-input"
                type="number"
                defaultValue={form.minPlayers.get()}
                onChange={(e) =>
                  handleNumberChange(e.currentTarget.value, form.minPlayers.set)
                }
              />
            </div>
            <div className="uk-width-1-2">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Nombre de joueurs maximum
              </label>
              <input
                className="uk-input"
                type="number"
                defaultValue={form.maxPlayers.get()}
                onChange={(e) =>
                  handleNumberChange(e.currentTarget.value, form.maxPlayers.set)
                }
              />
            </div>
          </div>
        </div>
        <GameTypeInputForm
          defaultValue={form.type.get}
          setType={(value: string) => form.type.set(value)}
        />
        <div className="uk-margin">
          <label>
            <input
              className="uk-checkbox"
              type="checkbox"
              onChange={() => form.isPrototype.set(!form.isPrototype.get())}
              checked={form.isPrototype.get()}
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
              checked={form.guideField.get()}
            />
            A t-il un lien de manuel?
          </label>
        </div>
        <div className="uk-margin" hidden={!form.guideField.get()}>
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Lien du manuel
          </label>
          <input
            className="uk-input"
            type="text"
            placeholder="entrer le lien..."
            defaultValue={form.guideLink.get()}
            onChange={(e) => form.guideLink.set(e.currentTarget.value)}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        className="uk-button uk-button-primary uk-align-center"
        disabled={!formErrors.$form.valid}
      >
        {editMode ? "Modifier" : "Créer"}
      </button>
    </form>
  );
};

export default GameForm;
