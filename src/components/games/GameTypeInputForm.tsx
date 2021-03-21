import { FC } from "react";
import { useGet } from "../../hooks/useGet";
import { IGameType } from "../../utils/types";

const GameTypeInputForm: FC<{
  setGameType: (gameTypeId: IGameType | null) => void;
}> = ({ setGameType }) => {
  const [gameTypes, isLoading, isErrored] = useGet<IGameType[]>(
    "/api/game-type"
  );

  const handleChange = (e: any): void => {
    if (e.currentTarget.value === "") {
      setGameType(null);
    } else {
      setGameType(JSON.parse(e.currentTarget.value));
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
            <select
              className="uk-select"
              id="form-stacked-select"
              onChange={handleChange}
            >
              <option value="">-</option>
              {gameTypes!.map((gameType: IGameType, index: number) => {
                return (
                  <option value={JSON.stringify(gameType)}>
                    {gameType.label}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default GameTypeInputForm;
