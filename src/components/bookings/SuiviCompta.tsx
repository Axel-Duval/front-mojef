import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { useGet } from "../../hooks/useGet";
import { IBooking } from "../../utils/types";
import Loading from "../Loading";

interface ISuiviCompta {
  bookingId: string;
}

const SuiviCompta = ({ bookingId }: ISuiviCompta) => {
  const [factureSend, setFactureSend] = useState<string | undefined>(undefined);
  const [facturePaid, setFacturePaid] = useState<string | undefined>(undefined);
  const [booking, loading] = useGet<IBooking>(`api/booking/${bookingId}`);
  const instance = useAxios();

  useEffect(() => {
    setFactureSend(booking?.billSentOn?.toString().slice(0, 10));
    setFacturePaid(booking?.billPaidOn?.toString().slice(0, 10));
  }, [booking]);

  useEffect(() => {
    factureSend &&
      instance
        .patch(`api/booking/${bookingId}/`, {
          billSentOn: new Date(factureSend),
        })
        .catch(() =>
          UIkit.notification({
            message: "Impossible d'enregistrer la date",
            pos: "top-center",
            status: "danger",
          })
        );
  }, [factureSend, instance, bookingId]);

  useEffect(() => {
    facturePaid &&
      instance
        .patch(`api/booking/${bookingId}/`, {
          billPaidOn: new Date(facturePaid),
        })
        .catch(() =>
          UIkit.notification({
            message: "Impossible d'enregistrer la date",
            pos: "top-center",
            status: "danger",
          })
        );
  }, [facturePaid, instance, bookingId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="uk-margin-medium-top">
          <div className="uk-margin uk-form-width-medium">
            <label htmlFor="factureSent" className="uk-form-label">
              Facture envoyée
            </label>
            <div className="uk-form-controls">
              <input
                type="date"
                className="uk-input"
                id="factureSent"
                value={factureSend}
                onChange={(e) => setFactureSend(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin uk-form-width-medium">
            <label htmlFor="facturePaid" className="uk-form-label">
              Facture payée
            </label>
            <div className="uk-form-controls">
              <input
                type="date"
                className="uk-input"
                id="facturePaid"
                disabled={!factureSend}
                value={facturePaid}
                onChange={(e) => setFacturePaid(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuiviCompta;
