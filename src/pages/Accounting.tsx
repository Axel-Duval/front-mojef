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
      </div>
      {loading || errored ? (
        <Loading />
      ) : (
        <div>
          <h5>Avancement des factures</h5>
          Montant reçu / montant demandé : {data.totalPaidBillsEuro}€ / {data.totalSentBillsEuro}€ 
          <progress
            className="uk-progress"
            value={data.totalPaidBillsEuro}
            max={data.totalSentBillsEuro}
          />
          <hr />
          Quantité envoyé / quantité totale: {data.totalSentBills} / {data.totalBills} factures
          <progress
            className="uk-progress"
            value={data.totalSentBills}
            max={data.totalBills}
          />
          <hr />
          Quantité payé / quantité demandé: {data.totalPaidBills} / {data.totalSentBills} factures
          <progress
            className="uk-progress"
            value={data.totalPaidBills}
            max={data.totalSentBills}
          />
          <div className="uk-flex uk-flex-wrap">
            <Tile
              title={`de recette effectué${data.recipes >= 2 ? "s" : ""}`}
              body={`${data.recipes}€`}
              color="primary"
            />
            <Tile
              title={`de réduction accordé${data.discounts >= 2 ? "s" : ""}`}
              body={`${data.discounts}€`}
              color="default"
            />
            <Tile
              title={`de frais supplémentaires facturé${
                data.fees >= 2 ? "s" : ""
              }`}
              body={`${data.fees}€`}
              color="default"
            />
            <Tile
              title={`jeu${data.donations >= 2 ? "x" : ""} offert${
                data.donations >= 2 ? "s" : ""
              }`}
              body={data.donations}
              color={data.donations > 0 ? "primary" : "secondary"}
            />
            <Tile
              title={`jeu${data.raffle >= 2 ? "x" : ""} pour la tombola`}
              body={data.raffle}
              color={data.raffle > 0 ? "primary" : "secondary"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounting;
