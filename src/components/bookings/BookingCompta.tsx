import React, { useState } from "react";
import Heading from "../Heading";
import Loading from "../Loading";
interface IBookingCompta {
  bookingId: string;
}
const BookingCompta = ({ bookingId }: IBookingCompta) => {
  const [loading, setLoading] = useState(false);
  //TODO: fetch prices, table-quantities from API

  return (
    <>
      <Heading title="Facture" subtitle="Les prix spécifiés sont TTC">
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      {loading ? (
        <Loading />
      ) : (
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
            <tr>
              <th>
                <label className="uk-label uk-margin-remove-bottom">
                  Tarif 1
                </label>
              </th>
              <td>15€</td>
              <td>5€</td>
              <td>10</td>
              <td>20</td>
              <td>250€</td>
            </tr>
            <tr>
              <th>
                <label className="uk-label uk-margin-remove-bottom">
                  Tarif 2
                </label>
              </th>
              <td>15€</td>
              <td>5€</td>
              <td>10</td>
              <td>20</td>
              <td>250€</td>
            </tr>
            <tr>
              <th>
                <label className="uk-label uk-margin-remove-bottom">
                  Tarif 3
                </label>
              </th>
              <td>15€</td>
              <td>5€</td>
              <td>10</td>
              <td>20</td>
              <td>250€</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="uk-text-bold">
              <th>TOTAL</th>
              <td></td>
              <td></td>
              <td>30</td>
              <td>60</td>
              <td>250€</td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default BookingCompta;
