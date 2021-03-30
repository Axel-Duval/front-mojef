import { FC } from "react";
import { getState } from "../../utils/functions";
import { FilterState } from "../../utils/types";

const CompaniesFilter: FC<{ setFilters: (filters: any) => void }> = ({
  setFilters,
}) => {
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
        Statut
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                publisher: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Editeur</option>
          <option value={FilterState.OFF}>Non éditeur</option>
        </select>
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                exhibitor: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Exposant</option>
          <option value={FilterState.OFF}>Non exposant</option>
        </select>
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Etat du suivi
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                followed: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.OFF}>A débuter</option>
          <option value={FilterState.ON}>En cours</option>
        </select>
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Société active
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                active: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Active</option>
          <option value={FilterState.OFF}>Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default CompaniesFilter;
