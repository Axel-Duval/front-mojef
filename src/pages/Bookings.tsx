import React, { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import NewBookingModal from "../components/bookings/NewBookingModal";
import TableBookings from "../components/Tables/Bookings";
import { FestivalContext } from "../contexts/festival";
import { useGet } from "../hooks/useGet";
import { IBooking } from "../utils/types";

const Bookings = () => {
  const festivals = useContext(FestivalContext);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [bookings, isLoading, isErrored] = useGet<IBooking[]>(
    "/api/booking/festival/" + festivals.currentFestival?.id
  );

  useEffect(() => {
    isErrored &&
      UIkit.notification({
        message: "Impossible de récupérer les réservations",
        status: "danger",
        pos: "top-center",
      });
  }, [isErrored]);

  const filteredBookings = (bookings: IBooking[]) => {
    return bookings.filter((booking) => {
      return booking.company.includes(filterInput);
    });
  };

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <NewBookingModal
        show={showNewBookingModal}
        onClose={() => setShowNewBookingModal(false)}
      />
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Réservations</h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right -pointer"
            uk-icon="plus"
            uk-tooltip="ajouter une nouvelle réservation"
            onClick={() => setShowNewBookingModal(true)}
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
      <div id="toggle-filter-bookings">
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <input
            type="text"
            placeholder="Aa"
            className="uk-input uk-width-medium "
            onChange={(e) => setFilterInput(e.target.value)}
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
      <TableBookings bookings={filteredBookings(bookings || [])} />
    </div>
  );
};

export default Bookings;
