import { useContext, useEffect, useState } from "react";
import UIkit from "uikit";
import BookingsFilter from "../components/bookings/BookingsFilter";
import NewBookingModal from "../components/bookings/NewBookingModal";
import Loading from "../components/Loading";
import TableBookings from "../components/Tables/Bookings";
import { FestivalContext } from "../contexts/festival";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IBooking, IBookingJoinCompany, FilterState } from "../utils/types";

const Bookings = () => {
  const instance = useAxios();
  const festivals = useContext(FestivalContext);
  const [bookings, setBookings] = useState<IBookingJoinCompany[] | null>(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [useFilter, setUseFilter] = useState(false);
  const [filters, setFilters] = useState<{
    input: string;
    needVolunteers: boolean | null;
    paid: string;
    placed: boolean | null;
    present: boolean | null;
  }>({
    input: "",
    needVolunteers: null,
    paid: FilterState.NONE,
    placed: null,
    present: null,
  });
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
            .includes(filters.input.toLowerCase()) &&
          (filters.placed === null || booking.isPlaced === filters.placed) &&
          (filters.present === null || booking.isPresent === filters.present) &&
          (filters.needVolunteers === null ||
            booking.needVolunteers === filters.needVolunteers) &&
          ((filters.paid === "not sent" &&
            booking.billSentOn === null &&
            booking.billPaidOn === null) ||
            (filters.paid === "sent" &&
              booking.billSentOn !== null &&
              booking.billPaidOn === null) ||
            (filters.paid === "paid" &&
              booking.billSentOn !== null &&
              booking.billPaidOn !== null) ||
            filters.paid === FilterState.NONE)
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
            <BookingsFilter setFilters={setFilters} />
            <hr />
          </div>
          <TableBookings bookings={filteredBookings(bookings)} />
        </div>
      )}
    </>
  );
};

export default Bookings;
