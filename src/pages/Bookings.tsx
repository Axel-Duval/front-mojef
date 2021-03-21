import React from "react";
import TableBookings from "../components/Tables/Bookings";
import { IBookings } from "../utils/types";

const Bookings = () => {
  const test: IBookings[] = [
    {
      id: "zef",
      notes: "zefze",
      needVolunteers: false,
      isPresent: true,
      isPlaced: true,
      discount: 0,
      fees: 0,
      festival: "zef",
      company: "efe",
      createdOn: new Date(),
    },
  ];

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Réservations</h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="plus"
            uk-tooltip="ajouter une nouvelle réservation"
          />
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="database"
            uk-tooltip="filter les réservations"
            uk-toggle="target: #toggle-filter-bookings"
          />
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />
      <div id="toggle-filter-bookings" hidden={true}>
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <input
            type="text"
            placeholder="Aa"
            className="uk-input uk-width-medium "
          />
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Payé
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Placé
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input className="uk-checkbox" type="checkbox" /> Présent
          </label>
        </div>
        <hr />
      </div>
      <TableBookings bookings={test} />
    </div>
  );
};

export default Bookings;
