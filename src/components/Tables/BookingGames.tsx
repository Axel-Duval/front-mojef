import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useGet } from "../../hooks/useGet";
import { IGame, IGameQuantities } from "../../utils/types";

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
                <GameNameCell id={game.gameId} />
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
