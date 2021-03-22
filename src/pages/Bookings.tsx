import React, { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import NewBookingModal from "../components/bookings/NewBookingModal";
import TableBookings from "../components/Tables/Bookings";
import { FestivalContext } from "../contexts/festival";
import { useGet } from "../hooks/useGet";
import { IBookingJoinCompany } from "../utils/types";

const Bookings = () => {
  const festivals = useContext(FestivalContext);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    paid: false,
    placed: false,
    present: false,
  });
  const [filterInput, setFilterInput] = useState("");
  const [bookings, isLoading, isErrored] = useGet<IBookingJoinCompany[]>(
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

  const filteredBookings = (bookings: IBookingJoinCompany[]) => {
    return bookings.filter((booking) => {
      if (useFilter) {
        return (
          booking.company.name
            .toLowerCase()
            .includes(filterInput.toLowerCase()) &&
          booking.isPlaced === checkboxes.placed &&
          booking.isPresent === checkboxes.present &&
          !!booking.billPaidOn === checkboxes.paid
        );
      } else {
        return booking;
      }
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
            onClick={() => setUseFilter(!useFilter)}
          />
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />
      <div id="filter-bookings" hidden={!useFilter} className="-noselect">
        <div className="uk-flex uk-flex-center uk-flex-middle">
          <input
            type="text"
            placeholder="Aa"
            className="uk-input uk-width-medium "
            onChange={(e) => setFilterInput(e.target.value)}
          />
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={checkboxes.paid}
              onChange={() =>
                setCheckboxes({ ...checkboxes, paid: !checkboxes.paid })
              }
            />{" "}
            Payé
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={checkboxes.placed}
              onChange={() =>
                setCheckboxes({ ...checkboxes, placed: !checkboxes.placed })
              }
            />{" "}
            Placé
          </label>
          <label className="uk-margin-remove-bottom uk-margin-left">
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={checkboxes.present}
              onChange={() =>
                setCheckboxes({ ...checkboxes, present: !checkboxes.present })
              }
            />{" "}
            Présent
          </label>
        </div>
        <hr />
      </div>
      <TableBookings bookings={filteredBookings(bookings || [])} />
    </div>
  );
};

export default Bookings;
