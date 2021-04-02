import { useContext } from "react";
import Tile from "../components/dashboard/Tile";
import Loading from "../components/Loading";
import { FestivalContext } from "../contexts/festival";
import { useGet } from "../hooks/useGet";

const Accounting = () => {
  const festivalCtx = useContext(FestivalContext);
  const [data, loading, errored] = useGet<any>(
    `api/festival/${festivalCtx.currentFestival?.id}/accounting`,
    festivalCtx.currentFestival !== null
  );

  return (
    <div className="uk-flex uk-flex-column -fullheight">
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <h1 className="uk-heading-bullet">Comptabilité</h1>
        <div>
          <span
            className="uk-icon-link -pointer"
            uk-icon="cloud-upload"
            uk-tooltip="auto-sync"
          />
        </div>
      </div>
      <hr />
      {loading || errored ? (
        <Loading />
      ) : (
        <div className="-fullheight -dashboard-prices-wrapper">
          <div className="uk-margin-top uk-flex uk-flex-column uk-flex-middle">
            <div className="uk-flex uk-flex-wrap uk-margin-top">
              <Tile title="Recette" body={`${data.recipes}€`} color="primary" />
              <Tile
                title="Réductions"
                body={`${data.discounts}€`}
                color="default"
              />
              <Tile
                title="Suppléments"
                body={`${data.fees}€`}
                color="default"
              />
              <Tile
                title="Jeux offerts"
                body={data.donations}
                color="secondary"
              />
              <Tile title="Jeux tombola" body={data.raffle} color="secondary" />
            </div>

            <div className="uk-flex uk-flex-wrap uk-margin-medium-top">
              <div className="uk-card uk-card-default uk-card-body -timeline-card uk-margin-left uk-margin-right -noselect uk-margin-top">
                <h2 className="uk-text-center">{data.totalPaidBillsEuro}€</h2>
                <p className="uk-text-center uk-text-meta uk-text-light">
                  Montant reçu / Montant facturé
                </p>
                <progress
                  className="uk-progress uk-width-medium uk-margin-remove"
                  value={data.totalPaidBillsEuro}
                  max={data.totalSentBillsEuro}
                />
                <div className="uk-flex uk-flex-between uk-flex-middle">
                  <span>0€</span>
                  <span>{data.totalSentBillsEuro}€</span>
                </div>
              </div>
              <div className="uk-card uk-card-default uk-card-body -timeline-card uk-margin-left uk-margin-right -noselect uk-margin-top">
                <h2 className="uk-text-center">{data.totalSentBills}</h2>
                <p className="uk-text-center uk-text-meta uk-text-light">
                  Factures envoyées / Toutes les factures
                </p>
                <progress
                  className="uk-progress uk-width-medium uk-margin-remove"
                  value={data.totalSentBills}
                  max={data.totalBills}
                />
                <div className="uk-flex uk-flex-between uk-flex-middle">
                  <span>0</span>
                  <span>{data.totalBills}</span>
                </div>
              </div>
              <div className="uk-card uk-card-default uk-card-body -timeline-card uk-margin-left uk-margin-right -noselect uk-margin-top">
                <h2 className="uk-text-center">{data.totalPaidBills}</h2>
                <p className="uk-text-center uk-text-meta uk-text-light">
                  Factures payées / Factures envoyées
                </p>
                <progress
                  className="uk-progress uk-width-medium uk-margin-remove"
                  value={data.totalPaidBills}
                  max={data.totalSentBills}
                />
                <div className="uk-flex uk-flex-between uk-flex-middle">
                  <span>0</span>
                  <span>{data.totalSentBills}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounting;
