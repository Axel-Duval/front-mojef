import React from "react";
import { useHistory } from "react-router-dom";
import { IBookingJoinCompany, ITableBookings } from "../../utils/types";

const Bookings = ({ bookings }: ITableBookings) => {
  const history = useHistory();
  return (
    <table className="uk-table uk-table-divider uk-table-small -noselect">
      <thead>
        <tr>
          <th>Société</th>
          <th>Date</th>
          <th>Statut</th>
          <th>Facture</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking: IBookingJoinCompany, index: number) => {
          return (
            <tr
              key={index}
              onClick={() => history.push("/app/reservations/" + booking.id)}
            >
              <td>{booking.company.name}</td>
              <td>
                {new Date(booking.createdOn).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
              </td>
              <td>
                {booking.isPlaced && (
                  <label className="uk-label uk-margin-right uk-margin-remove-bottom">
                    Placé
                  </label>
                )}
                {booking.isPresent && (
                  <label className="uk-label uk-margin-remove-bottom">
                    Présent
                  </label>
                )}
              </td>
              <td>
                {booking.billSentOn && !booking.billPaidOn && (
                  <label className="uk-label uk-label-warning">Envoyée</label>
                )}
                {booking.billSentOn && booking.billPaidOn && (
                  <label className="uk-label uk-label-success">Payée</label>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Bookings;
