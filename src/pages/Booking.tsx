import React, { useContext, useEffect, useState } from "react";
import BookingCommand from "../components/bookings/Command";
import BookingGames from "../components/bookings/Games";
import BookingContacts from "../components/bookings/Contacts";
import Notes from "../components/bookings/Notes";
import Timeline from "../components/bookings/Timeline";
import { useHistory, useParams } from "react-router-dom";
import { IBooking, ICompany } from "../utils/types";
import { useAxios } from "../hooks/useAxios";
import UIkit from "uikit";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/user";
import BookingCompta from "../components/bookings/BookingCompta";
import Heading from "../components/Heading";
import SuiviCompta from "../components/bookings/SuiviCompta";

const Booking = () => {
  const { id: bookingId } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [company, setCompany] = useState<ICompany | null>(null);
  const user = useContext(UserContext);
  const history = useHistory();
  const instance = useAxios();

  useEffect(() => {
    const fetchData = () => {
      instance
        .get(`/api/booking/${bookingId}`)
        .then((res) => {
          setBooking(res.data);
          instance.get(`/api/company/${res.data.companyId}`).then((res) => {
            setCompany(res.data);
          });
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible de récupérer ce suivi`,
            status: "danger",
            pos: "top-center",
          });
        });
    };
    fetchData();
  }, [bookingId, instance]);

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
      {!company || !booking ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">
              {company.name}
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
                  <Timeline
                    exchanges={booking.exchanges}
                    bookingId={booking.id!}
                  />
                </div>
                <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
                <div className="-flex-1">
                  <div className="uk-flex uk-flex-column -fullheight">
                    <BookingContacts
                      contacts={company.contacts}
                      companyId={company.id!}
                    />
                    <Notes notes={booking.notes} bookingId={booking.id!} />
                  </div>
                </div>
              </div>
            </li>
            <li className="-fullheight">
              <div className="uk-flex -fullheight -booking-responsive">
                <div className="-flex-1">
                  <BookingCommand booking={booking} />
                </div>
                <hr className="uk-divider-vertical -fullheight uk-margin-medium-left uk-margin-medium-right" />
                <div className="-flex-1">
                  <BookingGames bookingId={booking.id!} />
                </div>
              </div>
            </li>
            {user && user.jwtPayload?.isAdmin && (
              <li className="-fullheight">
                <div className="uk-flex -fullheight -booking-responsive">
                  <div className="-flex-1">
                    <BookingCompta bookingId={booking.id!} />
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
                    <SuiviCompta bookingId={booking.id!} />
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
