import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { IGame, IGameQuantities } from "../../utils/types";

interface IBookingGamesTable {
  gameQuantities: IGameQuantities[];
  onEdit?: Function;
  onDelete?: Function;
}

const BookingGames = ({
  gameQuantities,
  onEdit,
  onDelete,
}: IBookingGamesTable) => {
  const instance = useAxios();
  const [games, setGames] = useState<IGame[]>(new Array());

  useEffect(() => {
    gameQuantities.forEach((gq) => {
      instance.get(`api/game/${gq.gameId}`).then((res) => {
        setGames([...games, res.data]);
      });
    });
  }, [gameQuantities, instance]);

  function getName(gameId: string) {
    const res = games.filter((game) => game.id === gameId);
    if (res && res.length > 0 && res[0].name) {
      return res[0].name;
    } else {
      return "Nom introuvable";
    }
  }

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
            <th>Retour?</th>
            <th>Reçu</th>
            <th>Renvoyé</th>
            <th>Place</th>
            <th>Zone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gameQuantities.map((game: IGameQuantities, index: number) => {
            return (
              <tr key={index}>
                <td className="uk-text-bold">{getName(game.gameId)}</td>
                <td>{game.exhibited}</td>
                <td>{game.donation}</td>
                <td>{game.raffle}</td>
                <td>{game.needsReturn}</td>
                <td>{game.receivedOn}</td>
                <td>{game.returnedOn}</td>
                <td>{game.tablesCount}</td>
                <td>{game.areaId}</td>
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
