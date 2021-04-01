import React from "react";
import { useGet } from "../../hooks/useGet";
import { IArea, IGame, IGameQuantities } from "../../utils/types";

interface IBookingGamesTable {
  gameQuantities: IGameQuantities[];
  onEdit?: Function;
  onDelete?: Function;
}

function GameNameCell(props: { id: string }) {
  const [gameData, ,] = useGet<IGame>(`/api/game/${props.id}`);

  return (
    <td className="uk-text-bold">{gameData ? gameData.name : "Loading ..."}</td>
  );
}

function GameAreaCell(props: { id: string }) {
  const [areaData, ,] = useGet<IArea>(
    `/api/area/${props.id}`,
    props.id != null
  );
  if (areaData) {
    return (
      <td>
        <label className="uk-label uk-label-success">{areaData.label}</label>
      </td>
    );
  } else {
    return <td></td>;
  }
}

const BookingGames = ({
  gameQuantities,
  onEdit,
  onDelete,
}: IBookingGamesTable) => {
  return (
    <>
      <p className="uk-text-meta">Total : {gameQuantities.length}</p>
      <table className="uk-table uk-table-divider uk-table-small -noselect">
        <thead>
          <tr>
            <th className="uk-table-expand">Nom</th>
            <th>Exposés</th>
            <th>Dons</th>
            <th>Tombola</th>
            <th>Besoin retour</th>
            <th>Reçu</th>
            <th>Renvoyé</th>
            <th>Tables</th>
            <th>Zone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gameQuantities.map((game: IGameQuantities, index: number) => {
            return (
              <tr key={index}>
                <GameNameCell id={game.gameId} />
                <td>{game.exhibited}</td>
                <td>{game.donation}</td>
                <td>{game.raffle}</td>
                <td>
                  <input
                    type="checkbox"
                    className="uk-input uk-checkbox"
                    checked={game.needsReturn}
                    onChange={() => {}}
                  />
                </td>
                <td>
                  {game.receivedOn && (
                    <label className="uk-label">
                      {new Date(game.receivedOn).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </label>
                  )}
                </td>
                <td>
                  {game.returnedOn && (
                    <label className="uk-label uk-label-warning">
                      {new Date(game.returnedOn).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </label>
                  )}
                </td>
                <td>{game.tablesCount}</td>
                <GameAreaCell id={game.areaId} />
                <td>
                  {onEdit && (
                    <span
                      className="uk-icon-link uk-margin-small-right -pointer"
                      uk-icon="file-edit"
                      onClick={() => onEdit(game)}
                    />
                  )}
                  {onDelete && (
                    <span
                      className="uk-icon-link -pointer"
                      uk-icon="trash"
                      onClick={() => onDelete(game)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BookingGames;
