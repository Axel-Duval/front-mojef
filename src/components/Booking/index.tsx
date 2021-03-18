import React from "react";
import BookingCommand from "../BookingCommand";
import BookingGames from "../BookingGames";
import BookingContacts from "../BookingContacts";
import Notes from "../Notes";
import Timeline from "../Timeline";
import "./style.css";
import { useHistory } from "react-router-dom";

const Booking = () => {
  const history = useHistory();
  const edit = () => {
    console.log("edit company name");
  };
  const remove = () => {
    console.log("remove company");
  };

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
            onClick={history.goBack}
          />
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="file-edit"
            onClick={edit}
          />
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="trash"
            onClick={remove}
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
          <div className="uk-flex -fullheight -booking-responsive">
            <div className="-flex-1">
              <Timeline />
            </div>
            <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
            <div className="-flex-1">
              <div className="uk-flex uk-flex-column -fullheight">
                <BookingContacts />
                <Notes />
              </div>
            </div>
          </div>
        </li>
        <li className="-fullheight">
          <div className="uk-flex -fullheight -booking-responsive">
            <div className="-flex-1">
              <BookingCommand />
            </div>
            <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
            <div className="-flex-1">
              <BookingGames />
            </div>
          </div>
        </li>
        <li className="-fullheight">mozrizeopri</li>
      </ul>
    </div>
  );
};

export default Booking;
