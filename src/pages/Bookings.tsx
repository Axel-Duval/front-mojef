import React, { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import NewBookingModal from "../components/bookings/NewBookingModal";
import Loading from "../components/Loading";
import TableBookings from "../components/Tables/Bookings";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IBooking, IBookingJoinCompany } from "../utils/types";

enum FilterState {
  ON = "on",
  OFF = "off",
  NONE = "none",
}

const Bookings = () => {
  const instance = useAxios();
  const festivals = useContext(FestivalContext);
  const [bookings, setBookings] = useState<IBookingJoinCompany[] | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [filters, setFilters] = useState<{
    paid: boolean | null;
    placed: boolean | null;
    present: boolean | null;
  }>({
    paid: null,
    placed: null,
    present: null,
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

  const getState = (i: string): boolean | null => {
    switch (i) {
      case FilterState.ON:
        return true;
      case FilterState.OFF:
        return false;
      default:
        return null;
    }
  };

  const filteredBookings = (bookings: IBookingJoinCompany[]) => {
    return bookings.filter((booking) => {
      if (useFilter) {
        return (
          booking.company.name
            .toLowerCase()
            .includes(filterInput.toLowerCase()) &&
          (filters.placed === null || booking.isPlaced === filters.placed) &&
          (filters.present === null || booking.isPresent === filters.present) &&
          (filters.paid === null || !!booking.billPaidOn === filters.paid)
        );
      } else {
        return booking;
      }
    });
  };

  const handleSuccess = (booking: IBooking) => {
    //Fetch company
    instance
      .get(`/api/company/${booking.companyId}`)
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
        setShowNewBookingModal(false);
      })
      .catch(() => {
        UIkit.notification({
          message: "Impossible de créer un suivi",
          status: "danger",
          pos: "top-center",
        });
      });
  };

  return (
    <>
      {showNewBookingModal && (
        <NewBookingModal
          onClose={() => setShowNewBookingModal(false)}
          handleSuccess={handleSuccess}
        />
      )}
      {!bookings ? (
        <Loading />
      ) : (
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
                Etat paiement
                <select
                  className="uk-select"
                  onChange={(e) =>
                    setFilters((filters) => {
                      return {
                        ...filters,
                        paid: getState(e.target.value),
                      };
                    })
                  }
                >
                  <option value={FilterState.NONE}>-</option>
                  <option value={FilterState.ON}>Payé</option>
                  <option value={FilterState.OFF}>Non payé</option>
                </select>
              </label>
              <label className="uk-margin-remove-bottom uk-margin-left">
                Placement
                <select
                  className="uk-select"
                  onChange={(e) =>
                    setFilters((filters) => {
                      return {
                        ...filters,
                        placed: getState(e.target.value),
                      };
                    })
                  }
                >
                  <option value={FilterState.NONE}>-</option>
                  <option value={FilterState.ON}>Placé</option>
                  <option value={FilterState.OFF}>Non placé</option>
                </select>
              </label>
              <label className="uk-margin-remove-bottom uk-margin-left">
                Présence
                <select
                  className="uk-select"
                  onChange={(e) =>
                    setFilters((filters) => {
                      return {
                        ...filters,
                        present: getState(e.target.value),
                      };
                    })
                  }
                >
                  <option value={FilterState.NONE}>-</option>
                  <option value={FilterState.ON}>Présent</option>
                  <option value={FilterState.OFF}>Non présent</option>
                </select>
              </label>
            </div>
            <hr />
          </div>
          <TableBookings bookings={filteredBookings(bookings)} />
        </div>
      )}
    </>
  );
};

export default Bookings;
