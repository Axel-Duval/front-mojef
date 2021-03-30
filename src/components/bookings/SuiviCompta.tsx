import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import { useAxios } from "../../hooks/useAxios";
import { IBookingSummarize } from "../../utils/types";

interface ISuiviCompta {
  booking: IBookingSummarize;
}

const SuiviCompta = ({ booking }: ISuiviCompta) => {
  const [factureSend, setFactureSend] = useState<string | undefined>(
    booking.billSentOn?.toString().slice(0, 10)
  );
  const [facturePaid, setFacturePaid] = useState<string | undefined>(
    booking?.billPaidOn?.toString().slice(0, 10)
  );
  const instance = useAxios();

  useEffect(() => {
    factureSend &&
      instance
        .patch(`api/booking/${booking.id}/`, {
          billSentOn: new Date(factureSend),
        })
        .catch(() =>
          UIkit.notification({
            message: "Impossible d'enregistrer la date",
            pos: "top-center",
            status: "danger",
          })
        );
  }, [factureSend, instance, booking.id]);

  useEffect(() => {
    facturePaid &&
      instance
        .patch(`api/booking/${booking.id}/`, {
          billPaidOn: new Date(facturePaid),
        })
        .catch(() =>
          UIkit.notification({
            message: "Impossible d'enregistrer la date",
            pos: "top-center",
            status: "danger",
          })
        );
  }, [facturePaid, instance, booking.id]);

  return (
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
  );
};

export default SuiviCompta;
