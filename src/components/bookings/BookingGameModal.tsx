import React, { useContext } from "react";
import UIkit from "uikit";
import { FestivalContext } from "../../contexts/festival";
import { useAxios } from "../../hooks/useAxios";
import { useForm } from "../../hooks/useForm";
import { useGet } from "../../hooks/useGet";
import { IFestival, IGame, IGameQuantities } from "../../utils/types";
import { required } from "../../validators";
import Loading from "../Loading";
import Modal from "../Modal";

interface IBookingGameModal {
  onClose: Function;
  onSuccess: Function;
  gameQuantity: IGameQuantities | null;
  gamesIds: string[];
  bookingId: string;
}

const BookingGameModal = ({
  onClose,
  onSuccess,
  gameQuantity,
  gamesIds,
  bookingId,
}: IBookingGameModal) => {
  const instance = useAxios();
  const festivalId = useContext(FestivalContext).currentFestival?.id;
  const [games, loadingGames] = useGet<IGame[]>("/api/game");
  const [festival, loadingFestival] = useGet<IFestival>(
    `/api/festival/${festivalId}`
  );

  const [form, formErrors] = useForm({
    game: { default: gameQuantity?.gameId || null, validators: [required()] },
    exhibited: {
      default: gameQuantity?.exhibited || 1,
      validators: [required()],
    },
    donation: { default: gameQuantity?.donation || 0, validators: [] },
    raffle: { default: gameQuantity?.raffle || 0, validators: [] },
    returnedOn: { default: gameQuantity?.returnedOn || null, validators: [] },
    receivedOn: { default: gameQuantity?.receivedOn || null, validators: [] },
    needsReturn: {
      default: gameQuantity?.needsReturn || true,
      validators: [],
    },
    tablesCount: { default: gameQuantity?.tablesCount || 0, validators: [] },
    area: { default: gameQuantity?.areaId || null, validators: [] },
  });

  const onSubmit = (data: {
    game: string;
    exhibited: number;
    donation: number;
    raffle: number;
    returnedOn: Date;
    receivedOn: Date;
    needsReturn: boolean;
    tablesCount: number;
    area: string;
    booking: string;
  }) => {
    if (gameQuantity) {
      //Edit mode
      const { game, booking, ...rest } = data;
      instance
        .patch(`api/game-quantities/${bookingId}/${game}`, rest)
        .then((res) => {
          onSuccess(res.data, true);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible d'effectuer la modification'`,
            status: "danger",
            pos: "top-center",
          });
        });
    } else {
      //Add mode
      instance
        .post("/api/game-quantities", data)
        .then((res) => {
          onSuccess(res.data, false);
        })
        .catch(() => {
          UIkit.notification({
            message: `Impossible d'ajouter ce jeu à la réservation'`,
            status: "danger",
            pos: "top-center",
          });
        });
    }
  };

  function getGameName(gameId: string) {
    const res = games && games.filter((game) => game.id === gameId);
    if (res && res.length > 0 && res[0].name) {
      return res[0].name;
    } else {
      return "Nom introuvable";
    }
  }

  return (
    <Modal
      onClose={onClose}
      title={gameQuantity ? "Modification" : "Ajouter un jeu"}
    >
      {loadingGames || loadingFestival ? (
        <Loading />
      ) : (
        <form
          className="uk-form-stacked -noselect"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              game: form.game.get(),
              exhibited: parseInt(form.exhibited.get()),
              donation: parseInt(form.donation.get()),
              raffle: parseInt(form.raffle.get()),
              returnedOn: form.returnedOn.get(),
              receivedOn: form.receivedOn.get(),
              needsReturn: form.needsReturn.get(),
              tablesCount: parseFloat(form.tablesCount.get()),
              area: form.area.get(),
              booking: bookingId,
            });
          }}
        >
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="GameQuantityGame">
              Jeu
            </label>
            <div className="uk-form-controls">
              {gameQuantity ? (
                <select
                  className="uk-select"
                  id="GameQuantityGame"
                  disabled={true}
                >
                  <option value="">{getGameName(gameQuantity.gameId)}</option>
                </select>
              ) : (
                <select
                  className="uk-select"
                  id="GameQuantityGame"
                  onChange={(e) => form.game.set(e.target.value)}
                >
                  <option value="">-</option>
                  {games &&
                    games
                      .filter((g) => !gamesIds.includes(g.id!))
                      .map((g, index) => {
                        return (
                          <option key={index} value={g.id}>
                            {g.name}
                          </option>
                        );
                      })}
                </select>
              )}
            </div>
          </div>
          <div className="uk-margin">
            <label htmlFor="GameQuantitiesExhibited" className="uk-form-label">
              Nombre d'exemplaires exposés
            </label>
            <div className="uk-form-controls">
              <input
                placeholder="123"
                type="number"
                min="0"
                max="100"
                step="1"
                className="uk-input"
                id="GameQuantitiesExhibited"
                value={form.exhibited.get()}
                onChange={(e) => form.exhibited.set(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label htmlFor="GameQuantitiesDonation" className="uk-form-label">
              Nombre d'exemplaires donnés
            </label>
            <div className="uk-form-controls">
              <input
                placeholder="123"
                type="number"
                min="0"
                max="100"
                step="1"
                className="uk-input"
                id="GameQuantitiesDonation"
                value={form.donation.get()}
                onChange={(e) => form.donation.set(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label htmlFor="GameQuantitiesRaffle" className="uk-form-label">
              Nombre d'exemplaires tombola
            </label>
            <div className="uk-form-controls">
              <input
                placeholder="123"
                type="number"
                min="0"
                max="100"
                step="1"
                className="uk-input"
                id="GameQuantitiesRaffle"
                value={form.raffle.get()}
                onChange={(e) => form.raffle.set(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label>
              <input
                className="uk-checkbox"
                type="checkbox"
                checked={form.needsReturn.get()}
                onChange={() => form.needsReturn.set(!form.needsReturn.get())}
              />{" "}
              Besoin de retourner les jeux
            </label>
          </div>
          <div className="uk-margin">
            <label htmlFor="GameQuantitiesReceiveOn" className="uk-form-label">
              Jeux reçus le
            </label>
            <div className="uk-form-controls">
              <input
                type="date"
                className="uk-input"
                id="GameQuantitiesReceiveOn"
                value={form.receivedOn.get()}
                onChange={(e) => form.receivedOn.set(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label htmlFor="GameQuantitiesReturnedOn" className="uk-form-label">
              Jeux rendus le
            </label>
            <div className="uk-form-controls">
              <input
                type="date"
                className="uk-input"
                id="GameQuantitiesReturnedOn"
                value={form.returnedOn.get()}
                onChange={(e) => form.returnedOn.set(e.target.value)}
                disabled={!form.needsReturn.get()}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label
              htmlFor="GameQuantitiesTablesNeeded"
              className="uk-form-label"
            >
              Tables nécessaires
            </label>
            <div className="uk-form-controls">
              <input
                placeholder="123"
                type="number"
                min="0"
                max="100"
                step="1"
                className="uk-input"
                id="GameQuantitiesTablesNeeded"
                value={form.tablesCount.get()}
                onChange={(e) => form.tablesCount.set(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="GameQuantityZone">
              Zone
            </label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                id="GameQuantityZone"
                onChange={(e) => form.area.set(e.target.value)}
              >
                <option value="">-</option>
                {festival &&
                  festival.areas.map((area, index) => {
                    return (
                      <option key={index} value={area.id}>
                        {area.label}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="uk-button uk-button-primary uk-align-center"
            disabled={!formErrors.$form.valid}
          >
            Enregistrer
          </button>
        </form>
      )}
    </Modal>
  );
};

export default BookingGameModal;
