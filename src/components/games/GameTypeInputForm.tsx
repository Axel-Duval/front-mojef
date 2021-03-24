import { FC, useState } from "react";
import { useGet } from "../../hooks/useGet";
import Autosuggest from "react-autosuggest";

interface IRequestResult {
  type: string;
}

const GameTypeInputForm: FC<{
  defaultValue: string;
  setType: (gameTypeId: string) => void;
}> = ({ defaultValue, setType }) => {
  const [gameTypes, isLoading, isErrored] = useGet<IRequestResult[]>(
    "/api/game/types"
  );
  const [userInput, setUserInput] = useState<string>(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputProps = {
    placeholder: "Insérer le type de jeu...",
    value: userInput,
    onChange: (event: any, params: { newValue: string }) => {
      setUserInput(params.newValue);
    },
  };

  const findSuggestions = (input: string): string[] => {
    if (gameTypes) {
      let res: string[] = [];
      const cleanedInput = input.toLowerCase().trim();
      for (let i = 0; i < gameTypes.length; i++) {
        if (
          gameTypes[i].type.toLowerCase().slice(0, cleanedInput.length) ===
          cleanedInput
        ) {
          res.push(gameTypes[i].type);
        }
      }
      return res;
    } else {
      return [];
    }
  };

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

  return (
    <div className="uk-margin -autosuggest">
      {isLoading ? (
        "loading ..."
      ) : (
        <>
          <label className="uk-form-label" htmlFor="form-stacked-text">
            Type de jeu
          </label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={(params: { value: string }) => {
              setType(params.value);
              setSuggestions(findSuggestions(params.value));
            }}
            onSuggestionSelected={(event: any, data: any) => {
              setType(data.suggestion);
            }}
            alwaysRenderSuggestions={true}
            getSuggestionValue={(value) => value}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </>
      )}
    </div>
  );
};

export default GameTypeInputForm;
