import React, { useContext, useState } from "react";
import UIkit from "uikit";
import { FestivalContext } from "../../contexts/festival";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { IPrice } from "../../utils/types";
import { minLength } from "../../validators";

interface IPriceForm {
  onSuccess: Function;
  price: IPrice | null;
}

const PriceForm = ({ onSuccess, price }: IPriceForm) => {
  const festivalId = useContext(FestivalContext).currentFestival?.id!;
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, formErrors] = useForm({
    label: {
      default: price?.label || "",
      validators: [minLength(2)],
    },
    tableCount: {
      default: price?.tableCount || 0,
      validators: [],
    },
    floorCount: {
      default: price?.floorCount || 0,
      validators: [],
    },
    tablePrice: {
      default: price?.tablePrice || 0,
      validators: [],
    },
    floorPrice: {
      default: price?.floorPrice || 0,
      validators: [],
    },
  });

  const submitForm = (p: any) => {
    setLoading(true);
    if (price) {
      //Edit mode
      instance
        .patch(`/api/price/${price.id}`, p)
        .then((res) => {
          onSuccess(res.data, true);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible de modifier le tarif`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    } else {
      //Add mode
      instance
        .post("/api/price", p)
        .then((res) => {
          onSuccess(res.data, false);
        })
        .catch((err) => {
          console.log(err);
          UIkit.notification({
            message: `Impossible de créer le tarif`,
            status: "danger",
            pos: "top-center",
          });
        })
        .finally(() => setLoading(false));
    }
  };
  return (
    <form
      className="uk-form-stacked -noselect"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm({
          label: form.label.get(),
          tableCount: form.tableCount.get(),
          floorCount: form.floorCount.get(),
          tablePrice: form.tablePrice.get(),
          floorPrice: form.floorPrice.get(),
          festival: festivalId,
        });
      }}
    >
      <div className="uk-margin">
        <label htmlFor="priceLabel" className="uk-form-label">
          Label
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="Aa"
            type="text"
            className="uk-input"
            id="priceLabel"
            value={form.label.get()}
            onChange={(e) => form.label.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="priceCountTables" className="uk-form-label">
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
            id="priceCountTables"
            value={form.tableCount.get()}
            onChange={(e) => form.tableCount.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="priceTable" className="uk-form-label">
          Prix de la table (€)
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="123"
            className="uk-input"
            id="priceTable"
            min="0"
            max="200"
            step="0.5"
            type="number"
            value={form.tablePrice.get()}
            onChange={(e) => form.tablePrice.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="priceCountFloor" className="uk-form-label">
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
            id="priceCountFloor"
            value={form.floorCount.get()}
            onChange={(e) => form.floorCount.set(e.target.value)}
          />
        </div>
      </div>
      <div className="uk-margin">
        <label htmlFor="priceFloor" className="uk-form-label">
          Prix du m² (€)
        </label>
        <div className="uk-form-controls">
          <input
            placeholder="123"
            className="uk-input"
            id="priceFloor"
            min="0"
            max="200"
            step="0.5"
            type="number"
            value={form.tablePrice.get()}
            onChange={(e) => form.floorPrice.set(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="uk-button uk-button-primary uk-align-center"
        disabled={loading || !formErrors.$form.valid}
      >
        Enregistrer
      </button>
    </form>
  );
};

export default PriceForm;
