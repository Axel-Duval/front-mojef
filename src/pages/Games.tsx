import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import GameForm from "../components/games/GameForm";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import GamesTable from "../components/Tables/Games";
import { useAxios } from "../hooks/useAxios";
import { useGet } from "../hooks/useGet";
import { IGame } from "../utils/types";

const Games = () => {
  const instance = useAxios();
  const [data, loading] = useGet<IGame[]>("/api/game");
  const [games, setGames] = useState<IGame[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [gameToEdit, setGameToEdit] = useState<IGame | null>(null);

  useEffect(() => {
    if (data) {
      setGames(data);
    }
  }, [data]);

  useEffect(() => {
    if (!modalState) {
      setGameToEdit(null);
    }
  }, [modalState]);

  const handleEdit = (game: IGame) => {
    setGameToEdit(game);
    setModalState(true);
  };

  const handleDelete = (game: IGame) => {
    UIkit.modal
      .confirm(`Êtes vous sûr de vouloir supprimer le jeu ${game.name}?`)
      .then(() => deleteGame(game));
  };

  const switchGameIsPrototype = (game: IGame) => {
    setGames((games) => {
      return games.map((g) => {
        if (g.id === game.id) {
          return {
            ...g,
            isPrototype: !g.isPrototype,
          };
        }
        return g;
      });
    });
    instance
      .patch(`/api/game/${game.id}`, { isPrototype: !game.isPrototype })
      .catch(() => {
        setGames((games) => {
          return games.map((g) => {
            if (g.id === game.id) {
              return game;
            }
            return g;
          });
        });
      });
  };

  const deleteGame = (game: IGame) => {
    setGames((games) => {
      return games.filter((g) => g.id !== game.id);
    });
    instance.delete(`/api/game/${game.id}`).catch((err) => {
      setGames((games) => {
        return [...games, game];
      });
      UIkit.notification({
        message: `Impossible de supprimer le jeu ${game.name}`,
        status: "danger",
        pos: "top-center",
      });
    });
  };

  const handleModalSuccess = (game: IGame, editMode: boolean): void => {
    if (editMode) {
      setGames((games) =>
        games.map((g) => {
          if (g.id === game.id) {
            return game;
          }
          return g;
        })
      );
    } else {
      setGames((games) => {
        return [...games, game];
      });
    }
    setModalState(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="uk-flex uk-flex-column -fullheight">
          <div className="uk-flex uk-flex-between uk-flex-middle">
            <h1 className="uk-heading-bullet">Jeux</h1>
            <div>
              <span
                className="uk-icon-link uk-margin-small-right"
                uk-icon="plus"
                onClick={() => setModalState(true)}
              />
              <span
                className="uk-icon-link uk-margin-small-right -pointer"
                uk-icon="database"
                uk-tooltip="filter les jeux"
                uk-toggle="target: #toggle-filter-games"
              />
              <span
                className="uk-icon-link -pointer"
                uk-icon="cloud-upload"
                uk-tooltip="auto-sync"
              />
            </div>
          </div>
          <hr />
          <div id="toggle-filter-games" hidden={true}>
            <div className="uk-flex uk-flex-center uk-flex-middle">
              <input
                type="text"
                placeholder="Aa"
                className="uk-input uk-width-medium "
              />
              <label className="uk-margin-remove-bottom uk-margin-left">
                <input className="uk-checkbox" type="checkbox" /> Editeur
              </label>
              <label className="uk-margin-remove-bottom uk-margin-left">
                <input className="uk-checkbox" type="checkbox" /> Exposant
              </label>
              <label className="uk-margin-remove-bottom uk-margin-left"></label>
              <label className="uk-margin-remove-bottom uk-margin-left">
                <input className="uk-checkbox" type="checkbox" /> Suivi en cours
              </label>
              <label className="uk-margin-remove-bottom uk-margin-left">
                <input className="uk-checkbox" type="checkbox" /> Pas de suivi
              </label>
            </div>
            <hr />
          </div>
          {modalState && (
            <Modal
              onClose={() => setModalState(false)}
              title={
                gameToEdit ? `Modifier ${gameToEdit.name}` : "Ajouter un jeu"
              }
            >
              <GameForm onSuccess={handleModalSuccess} game={gameToEdit} />
            </Modal>
          )}
          <GamesTable
            games={games}
            onEdit={handleEdit}
            onToggle={switchGameIsPrototype}
            onDelete={handleDelete}
            showCompanies={true}
          />
        </div>
      )}
    </>
  );
};

export default Games;
