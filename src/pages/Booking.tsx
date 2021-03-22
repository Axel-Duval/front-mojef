import React, { useEffect } from "react";
import BookingCommand from "../components/bookings/Command";
import BookingGames from "../components/bookings/Games";
import BookingContacts from "../components/bookings/Contacts";
import Notes from "../components/bookings/Notes";
import Timeline from "../components/bookings/Timeline";
import { useHistory, useParams } from "react-router-dom";
import { IBooking, ICompany } from "../utils/types";
import { useGet } from "../hooks/useGet";

const Booking = () => {
  const { id: bookingId } = useParams<{ id: string }>();
  const history = useHistory();

  const [booking, isLoadingB, isErroredB] = useGet<IBooking>(
    `/api/booking/${bookingId}`
  );

  const [company, isLoadingC, isErroredC] = useGet<ICompany>(
    `/api/company/${booking?.companyId}`
  );

  const remove = () => {
    console.log("remove booking");
  };

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">
          {company && company.name}
          {booking?.billPaidOn ? (
            <span className="uk-label uk-label-success uk-margin-left">
              Payé
            </span>
          ) : (
            <span className="uk-label uk-margin-left">En cours</span>
          )}
        </h1>
        <div>
          <span
            className="uk-icon-link uk-margin-small-right"
            uk-icon="reply"
            onClick={history.goBack}
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
              {booking && (
                <Timeline notes={booking?.notes!} bookingId={booking?.id!} />
              )}
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
        <li className="-fullheight">comptabilitéComponent</li>
      </ul>
    </div>
  );
};

export default Booking;
