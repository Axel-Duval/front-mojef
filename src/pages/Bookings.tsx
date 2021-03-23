import React, { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import NewBookingModal from "../components/bookings/NewBookingModal";
import TableBookings from "../components/Tables/Bookings";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IBooking, IBookingJoinCompany } from "../utils/types";

const Bookings = () => {
  const instance = useAxios();
  const festivals = useContext(FestivalContext);
  const [bookings, setBookings] = useState<IBookingJoinCompany[] | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    paid: false,
    placed: false,
    present: false,
  });
  const [filterInput, setFilterInput] = useState("");
  const [_bookings, isLoading, isErrored] = useGet<IBookingJoinCompany[]>(
    "/api/booking/festival/" + festivals.currentFestival?.id
  );

  useEffect(() => {
    setBookings(_bookings);
  }, [_bookings]);

  useEffect(() => {
    isErrored &&
      UIkit.notification({
        message: "Impossible de récupérer les suivis",
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

  const handleSuccess = (booking: IBooking) => {
    //Fetch company
    instance
      .get(`/api/company/${booking.company}`)
      .then((res) => {
        const newBooking: IBookingJoinCompany = {
          ...booking,
          company: res.data,
        };
        //Update bookings
        if (bookings) {
          setBookings([newBooking, ...bookings]);
        } else {
          setBookings([newBooking]);
        }
      })
      .catch(() => {});
  };

  return (
    <>
      {showNewBookingModal && (
        <NewBookingModal
          onClose={() => setShowNewBookingModal(false)}
          handleSuccess={handleSuccess}
        />
      )}
      <div className="uk-flex uk-flex-column -fullheight">
        <div className="uk-flex uk-flex-between uk-flex-middle">
          <h1 className="uk-heading-bullet">Suivis</h1>
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
        {bookings && (
          <TableBookings bookings={filteredBookings(bookings || [])} />
        )}
      </div>
    </>
  );
};

export default Bookings;
