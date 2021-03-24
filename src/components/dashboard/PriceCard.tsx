import React from "react";
import table from "../../assets/images/table.svg";
import floor from "../../assets/images/selection.svg";

const PriceCard = () => {
  return (
    <div className="uk-flex -noselect -prices">
      <div className="uk-card uk-card-hover uk-card-default uk-padding -prices-card">
        <div className="uk-flex uk-flex-middle uk-flex-between">
          <p className="uk-heading-small -price-label">Tarif 1</p>
          <span className="uk-icon-link -pointer" uk-icon="file-edit" />
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
          <p className="-price-number uk-margin-left">50€</p>
        </div>
        <div className="uk-card uk-card-secondary uk-card-body uk-padding-small uk-flex uk-flex-between -prices-rounded">
          <img
            width="30"
            height="30"
            alt="espace au sol"
            uk-img={floor}
            className="-img-white"
          />
          <p className="-price-number uk-margin-left">5€</p>
        </div>
      </div>
      <div className="uk-card uk-card-hover uk-card-primary uk-padding -prices-card uk-text-center">
        <div className="uk-card uk-card-body uk-card-default -prices-card-item -prices-rounded">
          <img width="40" height="40" alt="tables" uk-img={table} />
        </div>
        <hr className="-img-white" />
        <p className="-price-number">35/66</p>
        <label className="uk-label uk-label-success">44%</label>
      </div>
      <div className="uk-card uk-card-hover uk-card-secondary uk-padding -prices-card uk-text-center">
        <div className="uk-card uk-card-body uk-card-default -prices-card-item -prices-rounded">
          <img width="40" height="40" alt="espace au sol" uk-img={floor} />
        </div>
        <hr className="-img-white" />
        <p className="-price-number">12/10</p>
        <label className="uk-label uk-label-danger">114%</label>
      </div>
    </div>
  );
};

export default PriceCard;
