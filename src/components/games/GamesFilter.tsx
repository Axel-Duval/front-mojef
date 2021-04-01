import { FC } from "react";
import { useGet } from "../../hooks/useGet";
import { getState } from "../../utils/functions";
import { FilterState } from "../../utils/types";

interface IRequestResult {
  type: string;
}

const GamesFilter: FC<{
  setFilters: (filters: any) => void;
}> = ({ setFilters }) => {
  const [gameTypes, isLoading] = useGet<IRequestResult[]>("/api/game/types");

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle">
      <label className="uk-margin-remove-bottom uk-margin-large-right">
        Contient
        <input
          type="text"
          placeholder="Aa"
          className="uk-input"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                input: e.target.value,
              };
            })
          }
        />
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Jeu prototype
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                prototype: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Prototype</option>
          <option value={FilterState.OFF}>Non prototype</option>
        </select>
      </label>
      {!isLoading && (
        <label className="uk-margin-remove-bottom uk-margin-left">
          Type de jeu
          <select
            className="uk-select"
            onChange={(e) =>
              setFilters((filters: any) => {
                return {
                  ...filters,
                  type:
                    e.target.value === FilterState.NONE ? null : e.target.value,
                };
              })
            }
          >
            <option value={FilterState.NONE}>-</option>
            {gameTypes!.map((gameType, index) => {
              return (
                <option value={gameType.type} key={index}>
                  {gameType.type}
                </option>
              );
            })}
          </select>
        </label>
      )}
    </div>
  );
};

export default GamesFilter;
