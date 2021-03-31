import React, { useContext } from "react";
import BookingCommand from "../components/bookings/Command";
import BookingGames from "../components/bookings/Games";
import BookingContacts from "../components/bookings/Contacts";
import Notes from "../components/bookings/Notes";
import Timeline from "../components/bookings/Timeline";
import { useHistory, useParams } from "react-router-dom";
import { IBookingSummarize } from "../utils/types";
import { useAxios } from "../hooks/useAxios";
import UIkit from "uikit";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/user";
import BookingCompta from "../components/bookings/BookingCompta";
import Heading from "../components/Heading";
import SuiviCompta from "../components/bookings/SuiviCompta";
import { useGet } from "../hooks/useGet";

const Booking = () => {
  const { id: bookingId } = useParams<{ id: string }>();
  const [booking, loading] = useGet<IBookingSummarize>(
    `api/booking/${bookingId}`
  );
  const user = useContext(UserContext);
  const history = useHistory();
  const instance = useAxios();

  const remove = () => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer ce suivi ?")
      .then(() => {
        instance
          .delete(`/api/booking/${bookingId}`)
          .then((res) => {
            if (res.data && res.data.deleted) {
              history.goBack();
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            UIkit.notification({
              message: `Impossible de supprimer ce suivi`,
              status: "danger",
              pos: "top-center",
            });
          });
      })
      .catch(() => {});
  };

  return (
    <>
      {loading || !booking ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">
              {booking.company.name}
              {booking.billPaidOn ? (
                <span className="uk-label uk-label-success uk-margin-left">
                  Payé
                </span>
              ) : (
                <span className="uk-label uk-margin-left">En cours</span>
              )}
            </h1>
            <div>
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
                uk-icon="reply"
                onClick={history.goBack}
              />
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
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
              <a href="#informations">Jeux</a>
            </li>
            {user && user.jwtPayload?.isAdmin && (
              <li>
                <a href="#comptabilite">Comptabilité</a>
              </li>
            )}
          </ul>

          <ul className="uk-switcher uk-margin-medium-top -flex-1">
            <li className="-fullheight">
              <div className="uk-flex -fullheight -booking-responsive">
                <div className="-flex-1">
                  <Timeline booking={booking} />
                </div>
                <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
                <div className="-flex-1">
                  <div className="uk-flex uk-flex-column -fullheight">
                    <BookingContacts booking={booking} />
                    <Notes booking={booking} />
                  </div>
                </div>
              </div>
            </li>
            <li className="-fullheight">
              <BookingCommand booking={booking} />
            </li>
            <li className="-fullheight">
              <BookingGames booking={booking} />
            </li>
            {user && user.jwtPayload?.isAdmin && (
              <li className="-fullheight">
                <div className="uk-flex -fullheight -booking-responsive">
                  <div className="-flex-1">
                    <BookingCompta booking={booking} />
                  </div>
                  <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
                  <div className="-flex-1">
                    <Heading
                      title="Suivi facture"
                      subtitle="Les bons comptes font les bons amis"
                    >
                      <span
                        className="uk-icon-link -pointer"
                        uk-icon="cloud-upload"
                        uk-tooltip="auto-sync"
                      />
                    </Heading>
                    <SuiviCompta booking={booking} />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Booking;
