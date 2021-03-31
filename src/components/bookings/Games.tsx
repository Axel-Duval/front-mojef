import { IBookingSummarize, IGameQuantities } from "../../utils/types";
import BookingGamesTable from "../Tables/BookingGames";
import Heading from "../Heading";
import React, { useState } from "react";
import BookingGameModal from "./BookingGameModal";
import { useAxios } from "../../hooks/useAxios";
import UIkit from "uikit";

interface IBookingGames {
  booking: IBookingSummarize;
}

const BookingGames = ({ booking }: IBookingGames) => {
  const instance = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [gameQuantities, setGameQuantities] = useState(booking.gamesQuantities);
  const [
    editGameQuantity,
    setEditGameQuantity,
  ] = useState<IGameQuantities | null>(null);

  const handleSuccess = (gameQuantity: IGameQuantities, isEdit: boolean) => {
    if (isEdit) {
      //Edit mode
      setGameQuantities(
        gameQuantities.map((gq) => {
          if (gq.gameId === gameQuantity.gameId) {
            return gameQuantity;
          } else {
            return gq;
          }
        })
      );
    } else {
      //Add mode
      setGameQuantities([...gameQuantities, gameQuantity]);
    }
    setShowModal(false);
    setEditGameQuantity(null);
  };

  const handleDelete = (gameQuantity: IGameQuantities) => {
    UIkit.modal
      .confirm("Etes vous sûr de vouloir supprimer le jeu de la commande ?")
      .then(() => {
        instance
          .delete(
            `api/game-quantities/${gameQuantity.bookingId}/${gameQuantity.gameId}`
          )
          .then(() => {
            setGameQuantities(
              gameQuantities.filter((gq) => gq.gameId !== gameQuantity.gameId)
            );
          })
          .catch(() => {
            UIkit.notification({
              message: `Impossible de supprimer ce jeu de la réservation`,
              status: "danger",
              pos: "top-center",
            });
          });
      })
      .catch(() => {});
  };
  return (
    <div className="uk-flex uk-flex-column -fullheight -noselect">
      {showModal && (
        <BookingGameModal
          onClose={() => {
            setShowModal(false);
            setEditGameQuantity(null);
          }}
          onSuccess={handleSuccess}
          gameQuantity={editGameQuantity}
          gamesIds={gameQuantities.map((gq) => gq.gameId)}
          bookingId={booking.id}
        />
      )}
      <Heading title="Jeux présentés" subtitle="Dans le festival">
        <span
          className="uk-icon-link uk-margin-small-right -pointer"
          uk-icon="plus"
          onClick={() => setShowModal(true)}
        />
        <span
          className="uk-icon-link -pointer"
          uk-icon="cloud-upload"
          uk-tooltip="auto-sync"
        />
      </Heading>
      <div className="-booking-games">
        <ul className="-booking-games-container">
          <BookingGamesTable
            gameQuantities={gameQuantities}
            onEdit={(gq: IGameQuantities) => {
              setEditGameQuantity(gq);
              setShowModal(true);
            }}
            onDelete={handleDelete}
          />
        </ul>
      </div>
    </div>
  );
};

export default BookingGames;
