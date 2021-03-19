import React from "react";
import Heading from "../Heading";
import table from "../../assets/images/table.svg";
import selection from "../../assets/images/selection.svg";

const Bookingcommand = () => {
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      <Heading title="Récapitulatif" subtitle="Dernière mise a jour il y a 2h">
        <span className="uk-icon-link uk-margin-small-right" uk-icon="plus" />
        <span
          className="uk-icon-link"
          uk-icon="info"
          uk-tooltip="Vous pouvez modifier/supprimer la commande en passant la souris dessus"
        />
      </Heading>
      <div className="-booking-command">
        <ul className="-booking-command-container">
          <li className="uk-flex uk-flex-middle -booking-command-item">
            <p className="uk-label uk-margin-remove-bottom">Tarif 1</p>
            <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small uk-flex uk-flex-middle">
              <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                <img width="30" height="30" alt="" uk-img={table} />
              </div>
              <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                <p className="uk-text-bold uk-heading-small uk-margin-remove">
                  10
                </p>
              </div>
            </div>
            <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-margin-left uk-padding-small uk-flex uk-flex-middle">
              <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                <img width="30" height="30" alt="" uk-img={selection} />
              </div>
              <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                <p className="uk-text-bold uk-heading-small uk-margin-remove">
                  10
                </p>
              </div>
            </div>
            <div className="uk-flex uk-flex-middle uk-width-auto uk-card uk-card-default uk-card-body uk-padding-small -booking-command-card uk-margin-left -booking-command-hover-expand">
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="file-edit"
              />
              <span className="uk-icon-link" uk-icon="trash" />
            </div>
          </li>
          <li className="uk-flex uk-flex-middle -booking-command-item">
            <p className="uk-label uk-margin-remove-bottom">Tarif 1</p>
            <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small uk-flex uk-flex-middle">
              <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                <img
                  width="30"
                  height="30"
                  alt=""
                  uk-img={table}
                  uk-svg="true"
                />
              </div>
              <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                <p className="uk-text-bold uk-heading-small uk-margin-remove">
                  12
                </p>
              </div>
            </div>
            <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-margin-left uk-padding-small uk-flex uk-flex-middle">
              <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                <img width="30" height="30" alt="" uk-img={selection} />
              </div>
              <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                <p className="uk-text-bold uk-heading-small uk-margin-remove">
                  04
                </p>
              </div>
            </div>
            <div className="uk-flex uk-flex-middle uk-width-auto uk-card uk-card-default uk-card-body uk-padding-small -booking-command-card uk-margin-left -booking-command-hover-expand">
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="file-edit"
              />
              <span className="uk-icon-link" uk-icon="trash" />
            </div>
          </li>
          <li className="uk-flex uk-flex-middle -booking-command-item">
            <p className="uk-label uk-margin-remove-bottom">Tarif 1</p>
            <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small uk-flex uk-flex-middle">
              <div className="uk-card uk-card-default uk-card-body -booking-command-card uk-padding-small">
                <img width="30" height="30" alt="" uk-img={table} />
              </div>
              <div className="uk-flex uk-flex-center uk-flex-column uk-flex-middle uk-margin-left">
                <p className="uk-text-bold uk-heading-small uk-margin-remove">
                  21
                </p>
              </div>
            </div>
            <div className="uk-flex uk-flex-middle uk-width-auto uk-card uk-card-default uk-card-body uk-padding-small -booking-command-card uk-margin-left -booking-command-hover-expand">
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="file-edit"
              />
              <span className="uk-icon-link" uk-icon="trash" />
            </div>
          </li>
        </ul>
      </div>
      <div className="uk-flex uk-flex-between">
        <label>
          <input className="uk-checkbox" type="checkbox" /> Placé sur le plan
        </label>
        <label>
          <input className="uk-checkbox" type="checkbox" /> Sera présent
        </label>
        <label>
          <input className="uk-checkbox" type="checkbox" /> Besoin bénévoles
        </label>
      </div>
    </div>
  );
};

export default Bookingcommand;
