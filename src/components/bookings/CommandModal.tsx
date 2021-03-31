import React from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { IPrice, ITableQuantities } from "../../utils/types";
import { required } from "../../validators";
import Modal from "../Modal";

interface ICommandModal {
  onClose: Function;
  tableQuantitie: ITableQuantities | null;
  prices: IPrice[];
  onSuccess: Function;
  bookingId: string;
}

const CommandModal = ({
  onClose,
  tableQuantitie,
  prices,
  bookingId,
  onSuccess,
}: ICommandModal) => {
  const instance = useAxios();
  const [form, formErrors] = useForm({
    tables: {
      default: tableQuantitie?.tables || 0,
      validators: [],
    },
    floors: {
      default: tableQuantitie?.floors || 0,
      validators: [],
    },
    price: {
      default: tableQuantitie?.priceId || "",
      validators: [required()],
    },
  });
  function submitForm(quantity: {
    tables: number;
    floors: number;
    price: string;
  }) {
    if (tableQuantitie) {
      //Edit
      instance
        .patch(`api/table-quantities/${bookingId}/${quantity.price}`, {
          tablesCount: quantity.tables,
          floorsCount: quantity.floors,
        })
        .then((res) => onSuccess(res.data, !!tableQuantitie))
        .catch(() =>
          UIkit.notification({
            message: `Impossible de créer la commande`,
            status: "danger",
            pos: "top-center",
          })
        );
    } else {
      //Add
      instance
        .post(`api/table-quantities`, {
          tablesCount: quantity.tables,
          floorsCount: quantity.floors,
          price: quantity.price,
          booking: bookingId,
        })
        .then((res) => onSuccess(res.data, !!tableQuantitie))
        .catch(() =>
          UIkit.notification({
            message: `Impossible de créer la commande`,
            status: "danger",
            pos: "top-center",
          })
        );
    }
  }
  return (
    <Modal
      onClose={onClose}
      title={
        (tableQuantitie && tableQuantitie.price.label) || "Nouvelle commande"
      }
    >
      <form
        className="uk-form-stacked -noselect"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm({
            tables: parseInt(form.tables.get()),
            floors: parseInt(form.floors.get()),
            price: form.price.get(),
          });
        }}
      >
        <div className="uk-margin">
          <label htmlFor="commandPriceId" className="uk-form-label">
            Tarif
          </label>
          <div className="uk-form-controls">
            {tableQuantitie ? (
              <select className="uk-select" id="commandPriceId" disabled={true}>
                <option>{tableQuantitie.price.label}</option>
              </select>
            ) : (
              <select
                className="uk-select"
                id="commandPriceId"
                onChange={(e) => form.price.set(e.target.value)}
              >
                <option value="">-</option>
                {prices
                  .sort((a, b) =>
                    a.label.toLowerCase().localeCompare(b.label.toLowerCase())
                  )
                  .map((price, index) => {
                    return (
                      <option key={index} value={price.id}>
                        {price.label}
                      </option>
                    );
                  })}
              </select>
            )}
          </div>
        </div>
        <div className="uk-margin">
          <label htmlFor="commandCountTables" className="uk-form-label">
            Nombre de tables
          </label>
          <div className="uk-form-controls">
            <input
              placeholder="123"
              type="number"
              min="0"
              max="500"
              step="1"
              className="uk-input"
              id="commandCountTables"
              value={form.tables.get()}
              onChange={(e) => form.tables.set(e.target.value)}
            />
          </div>
        </div>
        <div className="uk-margin">
          <label htmlFor="commandCountFloors" className="uk-form-label">
            Nombre de m²
          </label>
          <div className="uk-form-controls">
            <input
              placeholder="123"
              type="number"
              min="0"
              max="500"
              step="1"
              className="uk-input"
              id="commandCountFloors"
              value={form.floors.get()}
              onChange={(e) => form.floors.set(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="uk-button uk-button-primary uk-align-center"
          disabled={!formErrors.$form.valid}
        >
          Enregistrer
        </button>
      </form>
    </Modal>
  );
};

export default CommandModal;
