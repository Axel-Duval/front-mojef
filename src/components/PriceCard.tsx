import React from "react";

const PriceCard = () => {
  return (
    <div className="uk-flex">
      <div className="uk-card uk-card-default uk-padding -prices-card">
        <p className="-price-label">label</p>
        <div>prix table</div>
        <div>prix m2</div>
      </div>
      <div className="uk-card uk-card-default uk-padding -prices-card uk-flex uk-flex-column uk-flex-middle">
        <div>table</div>
        <div>nb</div>
        <div>percent</div>
      </div>
      <div className="uk-card uk-card-default uk-padding -prices-card uk-flex uk-flex-column uk-flex-middle">
        <div>metres</div>
        <div>nb</div>
        <div>percent</div>
      </div>
    </div>
  );
};

export default PriceCard;
