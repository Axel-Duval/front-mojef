import React from "react";
import SuiviContactsNotes from "../SuiviContactsNotes";
import "./style.css";

function Booking() {
  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">
          Game Tavern
          <span className="uk-label uk-margin-left">En cours</span>
        </h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="reply"
          />
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="file-edit"
          />
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="trash"
          />
        </div>
      </div>
      <ul
        className="uk-tab"
        uk-switcher="animation: uk-animation-fade; toggle: > *"
        uk-tab="true"
      >
        <li>
          <a href="#suivi">Suivi</a>
        </li>
        <li>
          <a href="#informations">Informations</a>
        </li>
        <li>
          <a href="#comptabilite">Comptabilité</a>
        </li>
      </ul>

      <ul className="uk-switcher uk-margin-medium-top -flex-1">
        <li className="-fullheight">
          <SuiviContactsNotes />
        </li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </li>
        <li>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur, sed do eiusmod.
        </li>
      </ul>
    </div>
  );
}

export default Booking;
