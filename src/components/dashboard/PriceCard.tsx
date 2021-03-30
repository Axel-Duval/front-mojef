import React from "react";
import table from "../../assets/images/table.svg";
import floor from "../../assets/images/selection.svg";
import { IPrice, ITableQuantitie } from "../../utils/types";
interface IPriceCard {
  price: IPrice;
  quantitie: ITableQuantitie | null;
  onEdit: Function;
  onDelete: Function;
}

const PriceCard = ({ price, quantitie, onEdit, onDelete }: IPriceCard) => {
  const percent = (val: number, max: number) => {
    if (val === 0 || max === 0) {
      return 0;
    } else {
      return Math.floor((100 * val) / max);
    }
  };
  return (
    <div className="uk-flex -noselect -prices">
      <div className="uk-card uk-card-default uk-padding -prices-card">
        <div className="uk-flex uk-flex-between uk-flex-middle">
          <p className="uk-heading-small -price-label uk-text-center">
            {price.label}
          </p>
          <div>
            <span
              className="uk-icon-link uk-margin-left uk-margin-small-right -pointer"
              uk-icon="file-edit"
              onClick={() => onEdit(price)}
            />
            <span
              className="uk-icon-link -pointer"
              uk-icon="trash"
              onClick={() => onDelete(price)}
            />
          </div>
        </div>

        <hr />
        <div className="uk-card uk-card-primary uk-card-body uk-padding-small uk-flex uk-flex-between uk-margin-small-bottom -prices-rounded">
          <img
            width="30"
            height="30"
            alt="tables"
            uk-img={table}
            className="-img-white"
          />
          <p className="-price-number uk-margin-left">{price.tablePrice}€</p>
        </div>
        <div className="uk-card uk-card-secondary uk-card-body uk-padding-small uk-flex uk-flex-between -prices-rounded">
          <img
            width="30"
            height="30"
            alt="espace au sol"
            uk-img={floor}
            className="-img-white"
          />
          <p className="-price-number uk-margin-left">{price.floorPrice}€</p>
        </div>
      </div>
      <div className="uk-card uk-card-default uk-padding -prices-card uk-text-center">
        <div className="uk-card uk-card-body uk-card-default -prices-card-item -prices-rounded">
          <img width="40" height="40" alt="tables" uk-img={table} />
        </div>
        <hr className="-img-white" />
        <p className="-price-number -price-item">
          {quantitie?.tables || 0}/{price.tableCount}
        </p>
        <label
          className={
            "uk-label " +
            (percent(quantitie?.tables || 0, price.tableCount) > 100
              ? " uk-label-danger"
              : " uk-label-success")
          }
        >
          {percent(quantitie?.tables || 0, price.tableCount)}%
        </label>
      </div>
      <div className="uk-card uk-card-default uk-padding -prices-card uk-text-center">
        <div className="uk-card uk-card-body uk-card-default -prices-card-item -prices-rounded">
          <img width="40" height="40" alt="espace au sol" uk-img={floor} />
        </div>
        <hr className="-img-white" />
        <p className="-price-number -price-item">
          {quantitie?.floors || 0}/{price.floorCount}
        </p>
        <label
          className={
            "uk-label " +
            (percent(quantitie?.floors || 0, price.floorCount) > 100
              ? " uk-label-danger"
              : " uk-label-success")
          }
        >
          {percent(quantitie?.floors || 0, price.floorCount)}%
        </label>
      </div>
    </div>
  );
};

export default PriceCard;
