import { FC } from "react";
import { getState } from "../../utils/functions";
import { FilterState } from "../../utils/types";

const BookingsFilter: FC<{ setFilters: (filters: any) => void }> = ({
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
        Etat facturation
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                paid: e.target.value,
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value="not sent">Pas de facture</option>
          <option value="sent">Facture envoyé</option>
          <option value="paid">Facture payé</option>
        </select>
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Besoin de bénévoles
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                needVolunteers: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Besoin de bénévoles</option>
          <option value={FilterState.OFF}>Pas besoin</option>
        </select>
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Placement
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                placed: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Placé</option>
          <option value={FilterState.OFF}>Non placé</option>
        </select>
      </label>
      <label className="uk-margin-remove-bottom uk-margin-left">
        Présence
        <select
          className="uk-select"
          onChange={(e) =>
            setFilters((filters: any) => {
              return {
                ...filters,
                present: getState(e.target.value),
              };
            })
          }
        >
          <option value={FilterState.NONE}>-</option>
          <option value={FilterState.ON}>Présent</option>
          <option value={FilterState.OFF}>Non présent</option>
        </select>
      </label>
    </div>
  );
};

export default BookingsFilter;
