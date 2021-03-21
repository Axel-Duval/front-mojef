import { wait } from "@testing-library/dom";
import { FC, useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";

interface IRequestResult {
  type: string;
}

const GameTypeInputForm: FC<{
  setType: (gameTypeId: string) => void;
}> = ({ setType }) => {
  const [gameTypes, isLoading, isErrored] = useGet<IRequestResult[]>(
    "/api/game/types"
  );
  const [userInput, setUserInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setType(userInput);
    setSuggestions(findSuggestions());
  }, [userInput]);

  const findSuggestions = (): string[] => {
    if (gameTypes) {
      let res: string[] = [];
      for (let i = 0; i < gameTypes.length; i++) {
        if (
          gameTypes[i].type.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ) {
          res.push(gameTypes[i].type);
        }
      }
      return res;
    } else {
      return [];
    }
  };

  return (
    <div className="uk-margin">
      {isLoading ? (
        "loading ..."
      ) : (
        <>
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Type de jeu
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              id="form-stacked-text"
              type="text"
              placeholder="entrer le type de jeu..."
              onChange={(e) => {
                setUserInput(e.currentTarget.value);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GameTypeInputForm;
