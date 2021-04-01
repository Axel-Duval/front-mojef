import React from "react";
import { IBookingSummarize } from "../../utils/types";
import Heading from "../Heading";
interface IBookingCompta {
  booking: IBookingSummarize;
}
const BookingCompta = ({ booking }: IBookingCompta) => {
  return (
    <>
      <Heading title="Facture" subtitle="Les prix spécifiés sont TTC">
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      {booking.tablesQuantities && booking.tablesQuantities.length > 0 ? (
        <table className="uk-table uk-table-divider uk-table-middle uk-table-small -noselect">
          <thead>
            <tr>
              <th className="uk-table-shrink"></th>
              <th className="uk-table-shrink">Prix table</th>
              <th className="uk-table-shrink">Prix m²</th>
              <th className="uk-table-shrink">Nb tables</th>
              <th className="uk-table-shrink">Nb m²</th>
              <th className="uk-table-shrink">Coût</th>
            </tr>
          </thead>
          <tbody>
            {booking.tablesQuantities.map((quantity, index) => {
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
          </tbody>
          <tfoot>
            <tr className="uk-text-bold">
              <th>TOTAL</th>
              <td></td>
              <td></td>
              <td>
                {booking.tablesQuantities
                  .map((quantity) => quantity.tables)
                  .reduce((prev, curr) => prev + curr, 0)}
              </td>
              <td>
                {booking.tablesQuantities
                  .map((quantity) => quantity.floors)
                  .reduce((prev, curr) => prev + curr, 0)}
              </td>
              <td>
                {booking.tablesQuantities
                  .map(
                    (quantity) =>
                      quantity.tables * quantity.price.tablePrice +
                      quantity.floors * quantity.price.floorPrice
                  )
                  .reduce((prev, curr) => prev + curr, 0)}
                €
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className="uk-placeholder uk-text-center">
          Pas de commandes de tables ni de m²
        </div>
      )}
    </>
  );
};

export default BookingCompta;
