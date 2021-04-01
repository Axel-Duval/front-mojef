import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useGet } from "../../hooks/useGet";
import { IBookingSummarize } from "../../utils/types";
import Heading from "../Heading";
interface IBookingCompta {
  bookingId: string;
}

const BookingCompta = ({ bookingId }: IBookingCompta) => {
  const instance = useAxios();
  const [booking, setBooking] = useState<IBookingSummarize | null>(null);
  const [_booking, loading] = useGet<IBookingSummarize>(
    `api/booking/${bookingId}`,
    bookingId !== undefined
  );
  useEffect(() => {
    _booking && setBooking(_booking);
  }, [_booking]);

  const editDiscount = () => {
    UIkit.modal
      .prompt("Réduction en €", "" + booking?.discount)
      .then((body) => {
        if (body && body.length > 0) {
          if (parseInt(body) >= 0) {
            const data = { discount: parseInt(body) };
            instance
              .patch(`api/booking/${booking?.id}`, data)
              .then(() => setBooking({ ...booking!, ...data }))
              .catch(() =>
                UIkit.notification({
                  message: `Impossible d'appliquer la réduction`,
                  status: "danger",
                  pos: "top-center",
                })
              );
          } else {
            UIkit.notification({
              message: `Impossible d'appliquer la réduction`,
              status: "danger",
              pos: "top-center",
            });
          }
        }
      });
  };

  const editFees = () => {
    UIkit.modal.prompt("Supplément en €", "" + booking?.fees).then((body) => {
      if (body && body.length > 0) {
        if (parseInt(body) >= 0) {
          const data = { fees: parseInt(body) };
          instance
            .patch(`api/booking/${booking?.id}`, data)
            .then(() => setBooking({ ...booking!, ...data }))
            .catch(() =>
              UIkit.notification({
                message: `Impossible d'appliquer le supplément`,
                status: "danger",
                pos: "top-center",
              })
            );
        } else {
          console.log("ici");
          UIkit.notification({
            message: `Impossible d'appliquer le supplément`,
            status: "danger",
            pos: "top-center",
          });
        }
      }
    });
  };

  return (
    <>
      <Heading title="Facture" subtitle="Les prix spécifiés sont TTC">
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      {loading ||
      (booking &&
        booking.tablesQuantities &&
        booking.tablesQuantities.length > 0) ? (
        <>
          <table className="uk-table uk-table-divider uk-table-middle uk-table-small -noselect">
            <thead>
              <tr>
                <th className="uk-table-shrink">
                  <span
                    className="uk-icon-link uk-margin-small-left -pointer"
                    uk-icon="minus-circle"
                    uk-tooltip="Faire une réduction"
                    onClick={editDiscount}
                  />
                  <span
                    className="uk-icon-link uk-margin-small-left -pointer"
                    uk-icon="plus-circle"
                    uk-tooltip="Ajouter un supplément"
                    onClick={editFees}
                  />
                </th>
                <th className="uk-table-shrink">Prix table</th>
                <th className="uk-table-shrink">Prix m²</th>
                <th className="uk-table-shrink">Nb tables</th>
                <th className="uk-table-shrink">Nb m²</th>
                <th className="uk-table-shrink">Coût</th>
              </tr>
            </thead>
            <tbody>
              {booking &&
                booking.tablesQuantities.map((quantity, index) => {
                  return (
                    <tr key={index}>
                      <th>
                        <label className="uk-label uk-margin-remove-bottom">
                          {quantity.price.label}
                        </label>
                      </th>
                      <td>{quantity.price.tablePrice}€</td>
                      <td>{quantity.price.floorPrice}€</td>
                      <td>{quantity.tables}</td>
                      <td>{quantity.floors}</td>
                      <td>
                        {quantity.price.tablePrice * quantity.tables +
                          quantity.price.floorPrice * quantity.floors}
                        €
                      </td>
                    </tr>
                  );
                })}
              {booking && booking!.discount > 0 && (
                <tr>
                  <td>
                    <label className="uk-label uk-label-success uk-margin-remove-bottom">
                      Réduc
                    </label>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>-{booking?.discount}€</td>
                </tr>
              )}
              {booking && booking!.fees > 0 && (
                <tr>
                  <td>
                    <label className="uk-label uk-label-danger uk-margin-remove-bottom">
                      Suppl
                    </label>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>+{booking?.fees}€</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="uk-text-bold">
                <th>TOTAL</th>
                <td></td>
                <td></td>
                <td>
                  {booking &&
                    booking.tablesQuantities
                      .map((quantity) => quantity.tables)
                      .reduce((prev, curr) => prev + curr, 0)}
                </td>
                <td>
                  {booking &&
                    booking.tablesQuantities
                      .map((quantity) => quantity.floors)
                      .reduce((prev, curr) => prev + curr, 0)}
                </td>
                <td>
                  {booking &&
                    booking.tablesQuantities
                      .map(
                        (quantity) =>
                          quantity.tables * quantity.price.tablePrice +
                          quantity.floors * quantity.price.floorPrice
                      )
                      .reduce((prev, curr) => prev + curr, 0) +
                      booking.fees -
                      booking.discount}
                  €
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      ) : (
        <div className="uk-placeholder uk-text-center">
          Pas de commandes de tables ni de m²
        </div>
      )}
    </>
  );
};

export default BookingCompta;
